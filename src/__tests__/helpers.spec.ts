import { hashPassword } from '../helpers/password';

describe('Password', () => {
  test('Should be able to encrypt a password string', async () => {
    const password: string = 'some-password';
    const hashedpassword = await hashPassword(password);

    expect(hashedpassword).toEqual(expect.not.stringMatching(password));
  });
});
