import { Router } from 'express';

const router = Router();

import ReminderMiddlewares from '../middlewares/validations/reminder';
import * as Verify from '../middlewares/verify';

import * as ReminderControllers from '../controllers/reminder';

router.post(
  '/:email',
  [Verify.isCurrentUserLoggedIn, ReminderMiddlewares.addReminder],
  ReminderControllers.addReminderUnderUserWithMatchingEmail
);

export default router;
