import { getModelForClass, prop, Ref } from '@typegoose/typegoose';

import { Reminder } from './Reminder';

class User {
  @prop()
  public firstName!: string;

  @prop()
  public lastName!: string;

  @prop()
  public email!: string;

  @prop()
  public mobile!: string;

  @prop({ ref: () => Reminder })
  public reminders?: Ref<Reminder>[];
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  reminders?: Reminder[];
}

export const UserModel = getModelForClass(User);
