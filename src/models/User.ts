import { getModelForClass, prop, Ref, pre } from '@typegoose/typegoose';

import { ReminderClass } from './Reminder';
import { hashPassword } from '../utilities/password';

@pre<UserClass>('save', async function () {
  this.password = await hashPassword(this.password);
})
class UserClass {
  @prop()
  public firstName!: string;

  @prop()
  public lastName!: string;

  @prop()
  public mobile!: string;

  @prop()
  public password!: string;

  @prop({ ref: () => ReminderClass })
  public reminders?: Ref<ReminderClass>[];
}

export interface IUser {
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
  reminders?: any;
}

export const UserModel = getModelForClass(UserClass);
