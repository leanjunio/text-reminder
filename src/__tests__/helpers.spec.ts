import { hashPassword } from '../helpers/password';

describe('Password', () => {
  test('Should be able to encrypt a password string', async () => {
    const password: string = 'some-password';
    const hashedPassword = await hashPassword(password);

    expect(hashedPassword).toEqual(expect.not.stringMatching(password));
  });

    expect(hashedpassword).toEqual(expect.not.stringMatching(password));
  });
});
