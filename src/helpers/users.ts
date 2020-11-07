import { UserModel, IUser } from '../models/User';

export const registerUser = async (data: IUser) => {
  const createdUser = await UserModel.create(data);
  return createdUser;
};
