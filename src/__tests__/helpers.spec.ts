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
