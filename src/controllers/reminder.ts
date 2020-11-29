import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import * as ReminderServices from '../services/reminder';

export async function addReminderUnderUserWithMatchingEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const newReminder = await ReminderServices.addReminderUnderUserWithMatchingEmail(
      req.params.email,
      req.body
    );

    res.status(StatusCodes.OK).json({
      message: 'Added reminder',
      reminder: newReminder,
    });
  } catch (error) {
    next(error);
  }
}
