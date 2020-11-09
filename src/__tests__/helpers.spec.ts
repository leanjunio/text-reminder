import { Types } from 'mongoose';
import { hashPassword, comparePasswords } from '../utilities/password';
import { IUser } from '../models/User';

import { registerUser, getUserData, appendReminderToUser, fetchAllUserReminders } from '../helpers/users';
import { attachReminderToUser, createReminder, getReminder } from '../helpers/reminder';

import { IReminder } from '../models/Reminder';

import db from '../db-setup';

const createUser = async () => {
  const sampleUser: IUser = {
    firstName: 'John',
    mobile: '+16478394645',
    password: 'some-password',
  };

  const registeredUser = await registerUser(sampleUser);
  return registeredUser;
};

const createUserWithReminder = async () => {
  const reminderData: IReminder = {
    time: new Date(),
    message: 'buy new shoes',
  };

  const reminder = await createReminder(reminderData);
  const user: IUser = {
    firstName: 'John',
    mobile: '+16478394645',
    password: 'some-password',
    reminders: [reminder._id],
  };

  const registeredUser = await registerUser(user);
  return registeredUser;
};

describe('Testing helpers', () => {
  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clearDatabase());
  afterAll(async () => await db.closeDatabase());

  describe('Password', () => {
    test('Should be able to encrypt a password string', async () => {
      const password: string = 'some-password';

      const hashedPassword = await hashPassword(password);

      expect(hashedPassword).toEqual(expect.not.stringMatching(password));
    });

    test('Should return true when comparing the correct password', async () => {
      const password: string = 'some-password';

      const hashedPassword = await hashPassword(password);
      const areEqualPasswords = await comparePasswords(password, hashedPassword);

      expect(areEqualPasswords).toBeTruthy();
    });
  });

  describe('User', () => {
    test('Should be able to find a user and get _id', async () => {
      const createdUser = await createUser();
      const user: any = await getUserData(createdUser._id);

      expect(user._id).toBeDefined();
    });

    test('Should get a message saying "No user with id:{id} found."', async () => {
      const id = new Types.ObjectId();
      const user: any = await getUserData(id);

      expect(user).toMatch(/No user with id/);
    });

    test(`Should be able to get all of a user's reminders`, async () => {
      const createdUserWithReminder = await createUserWithReminder();

      expect(createdUserWithReminder.reminders).toBeDefined();
    });

    test(`Should be able to get all of a user's reminders and the new one`, async () => {
      const createdUser = await createUserWithReminder();
      const newReminder: IReminder = {
        time: new Date(),
        message: 'Buy oranges',
      };

      const savedReminder = await createReminder(newReminder);
      const user: any = await appendReminderToUser(createdUser._id, savedReminder._id);

      const userReminders = await fetchAllUserReminders(user._id);

      expect(userReminders).toBeDefined();
      expect(Array.isArray(userReminders)).toBeTruthy();
      expect(userReminders).toContainEqual(savedReminder._id);
    });
  });

  describe('Reminder', () => {
    test('Should be able to create a reminder', async () => {
      const newReminder: IReminder = {
        time: new Date(),
        message: 'Buy milk',
      };

      const reminder = await createReminder(newReminder);
      expect(reminder._id).toBeDefined();
    });

    test('Should be able to get the user with the updated reminder', async () => {
      const user = await createUser();
      const newReminder: IReminder = {
        time: new Date(),
        message: 'Buy milk',
      };

      const createdReminder = await createReminder(newReminder);
      const updatedUser: any = await attachReminderToUser(user._id, createdReminder._id);

      expect(updatedUser.reminders).toBeDefined();
      expect(Array.isArray(updatedUser.reminders)).toBe(true);
    });

    test(`Should be able to get a reminder's message when looking for a reminderId that exists`, async () => {
      const userWithReminder: any = await createUserWithReminder();
      const firstReminder = userWithReminder.reminders[0];
      const reminder: any = await getReminder(firstReminder);

      expect(reminder._id).toBeDefined();
      expect(reminder.time).toBeInstanceOf(Date);
      expect(reminder.message).toMatch('buy new shoes');
    });
  });
});
