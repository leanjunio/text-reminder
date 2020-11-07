import { ReminderModel, IReminder } from '../models/Reminder';
import { Schema } from 'mongoose';

export const createReminder = async (userId: Schema.Types.ObjectId, reminderData: IReminder) => {
  const reminder = await ReminderModel.create(reminderData);
  return reminder;
};

export const attachedReminderToUser = async (userId: Schema.Types.ObjectId, reminder: any) => {};
