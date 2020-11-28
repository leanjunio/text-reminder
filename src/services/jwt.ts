import jwt from 'jsonwebtoken';

export function signToken(data: any) {
  const TOKEN_EXPIRATION_12_HOURS = 12 * 60 * 60;
  const SECRET_KEY = process.env.SECRET_KEY!;

  const payload = {
    exp: Math.floor(Date.now() / 1000) + TOKEN_EXPIRATION_12_HOURS,
    data,
  };

  return jwt.sign(payload, SECRET_KEY);
}
