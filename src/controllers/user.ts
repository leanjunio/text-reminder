import { Request, Response } from 'express';
import * as userHelpers from '../helpers/users';

export const registerUser = async (req: Request, res: Response) => {
  const registeredUser = await userHelpers.registerUser({ ...req.body });

  res.json({
    message: 'User has been registered!',
    data: { user: registeredUser },
  });
};
