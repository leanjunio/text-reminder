import { Types } from 'mongoose';
import { UserModel, IUser } from '../models/User';
import { hashPassword } from '../utilities/password';

export const registerUser = async (userData: IUser) => {
  userData.password = await hashPassword(userData.password);
  const createdUser = await UserModel.create(userData);

  return createdUser;
};

export const getUserData = async (userId: Types.ObjectId) => {
  const user = await UserModel.findById(userId).exec();
  return user ?? `No user with id: ${userId} found`;
};

export const updateUserData = async (userId: Types.ObjectId, data: {}) => {
  const options = { new: true };
  const update = { ...data };

  const updatedUser = await UserModel.findByIdAndUpdate(userId, update, options).exec();

  return updatedUser;
};

export const fetchAllUserReminders = async (userId: Types.ObjectId) => {
  const projections = { reminders: true };
  const user = await UserModel.findById(userId, projections).exec();

  return user?.reminders ?? `User has no reminders.`;
};

export const appendReminderToUser = async (userId: Types.ObjectId, reminderId: Types.ObjectId) => {
  const user = await UserModel.findById(userId).exec();

  const reminders = user?.reminders;
  reminders?.push(reminderId);

  const update = { reminders };
  const updatedUser = await updateUserData(userId, update);

  return updatedUser;
};

export const checkIfUserAlreadyExists = async (mobile: string) => {
  const filter = { mobile };
  const foundUser = await UserModel.findOne(filter).exec();

  return foundUser;
};
