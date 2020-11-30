import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  return hashedPassword;
};

export const comparePasswords = async (password: string, hashed: string): Promise<boolean> => {
  const areEqualPasswords = await bcrypt.compare(password, hashed);
  return areEqualPasswords;
};
