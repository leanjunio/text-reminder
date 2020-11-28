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

export async function sendLoginToken(req: Request, res: Response, next: NextFunction) {
  try {
    await UserServices.sendLoginTokenToUserMobile(req.body.email);

    res.status(StatusCodes.OK).json({
      message: 'Login token sent. Enter the passcode to login',
    });
  } catch (error) {
    next(error);
  }
}

export async function verifyLoginToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = await UserServices.verifyLoginToken(req.body.token, req.body.mobile);

    res.status(StatusCodes.OK).json({
      message: 'Token verified. User logged in.',
      token,
    });
  } catch (error) {
    next(error);
  }
}
