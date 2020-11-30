import cron from 'node-cron';

import { UserModel } from '../models/User';
import * as UserServices from '../services/users';
import * as TwilioServices from '../services/twilio';

import { config } from '../config';
const log = config.LOG;

export async function sendAllRemindersToUsers() {
  try {
    const allUsers = await UserServices.findAllUsers();

    allUsers.forEach(user => sendRemindersToUser(user));
  } catch (error) {
    log.error(error.message);
    throw error;
  }
}

async function sendRemindersToUser(user: any) {
  try {
    const foundUser = await UserModel.findOne({ _id: user._id }).populate('reminders').exec();

    if (!foundUser?.reminders) {
      return Promise.reject(new Error(`Cannot find user reminders`));
    }

    const reminders = foundUser.reminders;

    reminders.forEach((reminder: any) => {
      const month = reminder.time.getUTCMonth();
      const dateOfMonth = reminder.time.getUTCDate();
      const hour = reminder.time.getUTCHours();
      const minute = reminder.time.getUTCMinutes();

      const message = reminder.message;

      let cronSchedule = `${minute} ${hour} ${dateOfMonth} ${month} *`;

      if (reminder.daily) {
        cronSchedule = `${minute} ${hour} * * *`;
      }

      cron.schedule(cronSchedule, () => {
        log.info(`Sending message: ${message} to ${user.mobile}`);
        TwilioServices.sendMessage(user.mobile, message);
      });
    });
  } catch (error) {
    log.error(error.message);
    throw error;
  }
}
