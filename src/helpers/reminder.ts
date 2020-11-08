import { ReminderModel, IReminder } from '../models/Reminder';
import { Schema } from 'mongoose';

export const createReminder = async (userId: Schema.Types.ObjectId, reminderData: IReminder) => {
  const reminder = await ReminderModel.create(reminderData);
  return reminder;
};

export const attachReminderToUser = async (userId: Types.ObjectId, reminderId: Types.ObjectId) => {
  const update = { reminders: [reminderId] };
  const updatedUser = await updateUserData(userId, update);

  return updatedUser ?? 'Failed to attach reminder to user';
};
