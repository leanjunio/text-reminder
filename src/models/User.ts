import { getModelForClass, prop } from '@typegoose/typegoose';

class UserClass {
  @prop()
  public firstName!: string;

  @prop()
  public mobile!: string;

  @prop()
  public password!: string;
}

export interface IUser {
  firstName: string;
  mobile: string;
  password: string;
}

export const UserModel = getModelForClass(UserClass);
