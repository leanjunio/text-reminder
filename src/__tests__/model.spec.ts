import { IUser } from '../models/User';
import { IReminder, ReminderModel } from '../models/Reminder';

import { registerUser } from '../helpers/users';

import db from '../db-setup';

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

  test('Should be able to create a A Reminder model', async () => {
    const sampleReminder: IReminder = {
      time: new Date(),
      message: 'Buy milk',
    };

    const user = await ReminderModel.create(sampleReminder);
  });
});
