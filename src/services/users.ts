import { Types } from 'mongoose';
import { UserModel, IUser } from '../models/User';

export function registerUser(userData: IUser) {
  return UserModel.create(userData);
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

export async function isAlreadyExistingUser(email: string): Promise<boolean> {
  try {
    const foundUser = await findUserWithEmail(email);
    const isExistingUser: boolean = !!foundUser;

    if (isExistingUser) {
      return Promise.reject(new Error(`A user with email: ${email} already exists`));
    }

    return isExistingUser;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}
