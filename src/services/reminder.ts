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

    const newReminder = createReminder(reminder);

    userWithMatchingEmail.reminders?.push(newReminder._id);
    userWithMatchingEmail.save();

    return newReminder.save();
  } catch (error) {
    log.error(error.message);
    throw error;
  }
}

function createReminder(reminder: IReminder) {
  return new ReminderModel(reminder);
}
