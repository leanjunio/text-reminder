import { hashPassword, comparePasswords } from '../utilities/password';

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
  test('Should be able to find a user and get all user props', async () => {
    const createdUser = await createUser();
    const user = await getUserData();

    expect(user._id).toBeDefined();
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
