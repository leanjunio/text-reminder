import { Types } from 'mongoose';

import { ReminderModel, IReminder } from '../models/Reminder';
import { updateUserData } from '../helpers/users';

export const createReminder = async (reminderData: IReminder) => {
  const reminder = await ReminderModel.create(reminderData);
  return reminder;
};

export const attachReminderToUser = async (userId: Types.ObjectId, reminderId: Types.ObjectId) => {
  const update = { reminders: [reminderId] };
  const updatedUser = await updateUserData(userId, update);

  return updatedUser ?? 'Failed to attach reminder to user';
};

export const getReminder = async (reminderId: Types.ObjectId) => {
  const reminder = await ReminderModel.findById(reminderId).exec();
  return reminder;
};
