import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

export async function addReminderUnderUserWithEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const userWithNewReminder = await UserServices.registerUser(req.body);

    res.status(StatusCodes.OK).json({
      message: 'Added reminder',
      user: userWithNewReminder,
    });
  } catch (error) {
    next(error);
  }
}
