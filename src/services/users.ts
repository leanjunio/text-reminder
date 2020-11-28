import { Types } from 'mongoose';
import { UserModel, IUser } from '../models/User';

import * as TwilioServices from '../services/twilio';
import * as JWTServices from '../services/jwt';

import { config } from '../config';

const log = config.LOG;

export function registerUser(userData: IUser) {
  return UserModel.create(userData);
}

export async function sendLoginTokenToUserMobile(email: string) {
  try {
    const userMobile = await retrieveUserMobileFromEmail(email);
    return TwilioServices.sendVerificationToken(userMobile);
  } catch (error) {
    log.error(error.message);
    throw error;
  }
}

export async function retrieveUserMobileFromEmail(email: string) {
  try {
    const foundUser = await UserModel.findOne({ email }).exec();

    if (!foundUser) {
      return Promise.reject(new Error(`A user with email: ${email} cannot be found.`));
    }

    return foundUser.mobile;
  } catch (error) {
    log.error(error.message);
    throw error;
  }
}

export async function verifyLoginToken(code: string, mobile: string) {
  try {
    const verification = await TwilioServices.retrieveVerificationStatus(code, mobile);
    const isApprovedVerificationStatus = verification.status === 'approved';

    if (isApprovedVerificationStatus) {
      return { token: JWTServices.signToken({ mobile }) };
    }
  } catch (error) {
    log.error(error.message);
    throw error;
  }
}

function findUserWithEmail(email: string) {
  return UserModel.findOne({ email }).exec();
}

const getUserData = async (userId: Types.ObjectId) => {
  const user = await UserModel.findById(userId).exec();
  return user ?? `No user with id: ${userId} found`;
};

const updateUserData = async (userId: Types.ObjectId, data: {}) => {
  const options = { new: true };
  const update = { ...data };

  const updatedUser = await UserModel.findByIdAndUpdate(userId, update, options).exec();

  return updatedUser;
};

const fetchAllUserReminders = async (userId: Types.ObjectId) => {
  const projections = { reminders: true };
  const user = await UserModel.findById(userId, projections).exec();

  return user?.reminders ?? `User has no reminders.`;
};

const appendReminderToUser = async (userId: Types.ObjectId, reminderId: Types.ObjectId) => {
  const user = await UserModel.findById(userId).exec();

  const reminders = user?.reminders;
  reminders?.push(reminderId);

  const update = { reminders };
  const updatedUser = await updateUserData(userId, update);

  return updatedUser;
};

export async function isAbleToRegister(email: string): Promise<boolean> {
  try {
    const foundUser = await findUserWithEmail(email);
    const isExistingUser: boolean = !!foundUser;

    if (isExistingUser) {
      return Promise.reject(new Error(`A user with email: ${email} already exists`));
    }

    return isExistingUser;
  } catch (error) {
    log.error(error.message);
    throw error;
  }
}
export async function isAbleToLogin(email: string): Promise<boolean> {
  try {
    const foundUser = await findUserWithEmail(email);
    const isExistingUser: boolean = !!foundUser;

    if (!isExistingUser) {
      return Promise.reject(new Error(`A user with email: ${email} does not exist.`));
    }

    return isExistingUser;
  } catch (error) {
    log.error(error.message);
    throw error;
  }
}
