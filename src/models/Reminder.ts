import { getModelForClass, prop } from '@typegoose/typegoose';

export class Reminder {
  @prop()
  public time!: Date;

  @prop()
  public message!: string;

  @prop()
  public daily?: boolean;
}

export interface IReminder {
  time: Date;
  message: string;
  daily?: boolean;
}

export const ReminderModel = getModelForClass(Reminder);
