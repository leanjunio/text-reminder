import { Types, Schema, mongo } from 'mongoose';
import { hashPassword, comparePasswords } from '../utilities/password';
import { IUser, UserModel } from '../models/User';

import { registerUser, getUserData } from '../helpers/users';
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
      const createdUser = await createUser();

      const reminders: IReminder[] = await fetchAllUserReminders(createdUser._id);
    });

    test(`Should be able to get all of a user's reminders and the new one`, async () => {
      const createdUser = await createUser();
      const newReminder: IReminder = {
        time: new Date(),
        message: 'Buy oranges',
      };

      const reminders: IReminder[] = await appendReminderToUser(createdUser._id);

      expect(reminders).toBeDefined();
      expect(reminders.length).toBeGreaterThanOrEqual(0);
    });
  });
});
