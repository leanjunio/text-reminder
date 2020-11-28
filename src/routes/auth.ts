import { Router } from 'express';

import * as AuthControllers from '../controllers/auth';
import * as UserMiddlewares from '../middlewares/user';
import UserValidation from '../middlewares/validations/user';

const router = Router();

router.post(
  '/register',
  [UserValidation.registerUser, UserMiddlewares.isAlreadyExistingUser],
  AuthControllers.registerUser
);

export default router;
