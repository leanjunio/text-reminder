import supertest from 'supertest';
import express from 'express';

import { IUser } from '../models/User';
import userRoutes from '../routes/users';

import db from '../db-setup';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', userRoutes);

const request = supertest(app);

describe('Controllers', () => {
  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clearDatabase());
  afterAll(async () => await db.closeDatabase());

  describe('Users', () => {
    test('Should return the registered user', async () => {
      const sampleUser: IUser = {
        firstName: 'JaneDoe',
        mobile: '+16475713515',
        password: 'test-password',
      };

      const response = await request.post('/users/register').send({ ...sampleUser });

      const { user } = response?.body?.data;

      expect(response.status).toBe(200);
      expect(user?._id).toBeDefined();
      expect(user?.firstName).toEqual(sampleUser.firstName);
      expect(user?.mobile).toEqual(sampleUser.mobile);
      expect(user?.password).toEqual(sampleUser.password);
    });
  });
});
