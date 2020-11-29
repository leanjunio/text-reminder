import { Router } from 'express';

const router = Router();

import ReminderMiddlewares from '../middlewares/validations/reminder';
import * as Verify from '../middlewares/verify';

router.post('/:email', [Verify.isCurrentUserLoggedIn, ReminderMiddlewares.addReminder]);

export default router;
