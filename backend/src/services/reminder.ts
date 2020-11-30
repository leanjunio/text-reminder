import { ReminderModel, IReminder } from '../models/Reminder';

import * as UserServices from '../services/users';

import { config } from '../config';

const log = config.LOG;

export async function addReminderUnderUserWithMatchingEmail(email: string, reminder: IReminder) {
  try {
    const userWithMatchingEmail = await UserServices.findUserWithMatchingEmail(email);

    if (!userWithMatchingEmail) {
      return Promise.reject(new Error(`Cannot add reminder. User with email ${email} cannot be found.`));
    }

    const createdReminder = await createReminder(reminder);

    userWithMatchingEmail.reminders?.push(createdReminder);
    await userWithMatchingEmail.save();

    return createdReminder;
  } catch (error) {
    log.error(error.message);
    throw error;
  }
}

function createReminder(reminder: IReminder) {
  const newReminder = new ReminderModel(reminder);

  return newReminder.save();
}
