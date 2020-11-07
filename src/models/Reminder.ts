import { getModelForClass, prop } from '@typegoose/typegoose';

export class ReminderClass {
  @prop()
  public time!: Date;

  @prop()
  public message!: string;
}

export interface IReminder {
  time: Date;
  message: string;
}

export const ReminderModel = getModelForClass(ReminderClass);
