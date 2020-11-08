import { getModelForClass, prop, Ref } from '@typegoose/typegoose';

import { ReminderClass } from './Reminder';

export class UserClass {
  @prop()
  public firstName!: string;

  @prop()
  public mobile!: string;

  @prop()
  public password!: string;

  @prop({ ref: () => ReminderClass })
  public reminders?: Ref<ReminderClass>[];
}

export interface IUser {
  firstName: string;
  mobile: string;
  password: string;
  reminders?: any;
}

export const UserModel = getModelForClass(UserClass);
