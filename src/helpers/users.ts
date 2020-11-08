import { Types } from 'mongoose';
import { UserModel, IUser } from '../models/User';

export const registerUser = async (userData: IUser) => {
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

  return user ?? `User has no reminders.`;
};
