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

    if (!isApprovedVerificationStatus) {
      return Promise.reject(new Error(`The verification failed. Please re-try logging in.`));
    }

    return JWTServices.signToken({ mobile });
  } catch (error) {
    log.error(error.message);
    throw error;
  }
}
export function findUserWithMatchingEmail(email: string) {
  return UserModel.findOne({ email }).exec();
}

export async function isAbleToRegister(email: string): Promise<boolean> {
  try {
    const foundUser = await findUserWithMatchingEmail(email);
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
    const foundUser = await findUserWithMatchingEmail(email);
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

export function findAllUsers() {
  return UserModel.find({}).exec();
}
