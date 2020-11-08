import { Types } from 'mongoose';
import { UserModel, IUser } from '../models/User';

export const registerUser = async (data: IUser) => {
  const createdUser = await UserModel.create(data);
  return createdUser;
};

export const getUserData = async (userId: Types.ObjectId) => {
  const user = await UserModel.findById(userId).exec();
  return user ?? `No user with id: ${userId} found`;
};
