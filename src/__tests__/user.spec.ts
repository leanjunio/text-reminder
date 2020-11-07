import { IUser, UserModel } from '../models/User';

import db from '../db-setup';

describe('User model', () => {
  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clearDatabase());
  afterAll(async () => await db.closeDatabase());

  test('Should be able to create a User model', async () => {
    const sampleUser: IUser = {
      firstName: 'John',
      mobile: '+16478394645',
      password: 'some-password',
    };

    const user = await UserModel.create(sampleUser);
  });
});
