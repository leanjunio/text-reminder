import { Request, Response } from 'express';
import * as userHelpers from '../helpers/users';

export const registerUser = async (req: Request, res: Response) => {
  const { mobile } = req.body;
  const foundUser = await userHelpers.checkIfUserAlreadyExists(mobile);

  if (!foundUser) {
    const registeredUser = await userHelpers.registerUser({ ...req.body });

    res.json({
      message: 'User has been registered!',
      data: { user: registeredUser },
    });
  } else {
    res.json({
      message: 'User already exists',
      data: { user: foundUser },
    });
  }
};
