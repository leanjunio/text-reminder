import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as UserServices from '../services/users';

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const registeredUser = await UserServices.registerUser(req.body);

    res.status(StatusCodes.OK).json({
      message: 'User registered',
      user: registeredUser,
    });
  } catch (error) {
    next(error);
  }
}