import { Request, Response, NextFunction } from 'express';

import * as UserServices from '../services/users';

export async function isAbleToRegister(req: Request, _: Response, next: NextFunction): Promise<void> {
  try {
    await UserServices.isAbleToRegister(req.body.email);
    next();
  } catch (error) {
    next(error);
  }
}

export async function isAbleToLogin(req: Request, _: Response, next: NextFunction): Promise<void> {
  try {
    await UserServices.isAbleToLogin(req.body.email);
    next();
  } catch (error) {
    next(error);
  }
}
