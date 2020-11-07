import { IUser } from '../models/User';
import { IReminder, ReminderModel } from '../models/Reminder';

import { registerUser } from '../helpers/users';
import { createReminder } from '../helpers/reminder';

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

describe('Models', () => {
  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clearDatabase());
  afterAll(async () => await db.closeDatabase());

  test(`Should return true when checking for registered user's properties`, async () => {
    const sampleUser: IUser = {
      firstName: 'John',
      mobile: '+16478394645',
      password: 'some-password',
    };

    const registeredUser = await registerUser(sampleUser);

    expect(registeredUser._id).toBeDefined();
  });

  test(`Should return true when checking for a newly created reminder`, async () => {
    const user = await createUser();
    const reminderData = {
      time: new Date(),
      message: 'Buy milk',
    };

    const reminder = await createReminder(user._id, reminderData);

    expect(reminder._id).toBeDefined();
  });

  test('Should be able to create a A Reminder model', async () => {
    const sampleReminder: IReminder = {
      time: new Date(),
      message: 'Buy milk',
    };

    const user = await ReminderModel.create(sampleReminder);
  });
});
