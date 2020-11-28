import { getModelForClass, prop, Ref } from '@typegoose/typegoose';

import { ReminderClass } from './Reminder';

class User {
  @prop()
  public firstName!: string;

  @prop()
  public lastName!: string;

  @prop()
  public email!: string;

  @prop()
  public mobile!: string;

  @prop({ ref: () => ReminderClass })
  public reminders?: Ref<ReminderClass>[];
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  reminders?: any;
}

export const UserModel = getModelForClass(User);
