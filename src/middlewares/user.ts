import { Request, Response, NextFunction } from 'express';

import * as UserServices from '../services/users';

export async function isAlreadyExistingUser(req: Request, _: Response, next: NextFunction): Promise<void> {
  try {
    await UserServices.isAlreadyExistingUser(req.body.email);
    next();
  } catch (error) {
    next(error);
  }
}
