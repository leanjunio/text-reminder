import { Router } from 'express';

import * as AuthControllers from '../controllers/auth';
import * as UserMiddlewares from '../middlewares/user';
import UserValidation from '../middlewares/validations/user';

const router = Router();

router.post(
  '/register',
  [UserValidation.registerUser, UserMiddlewares.isAbleToRegister],
  AuthControllers.registerUser
);

router.post(
  '/login/token',
  [UserValidation.loginUser, UserMiddlewares.isAbleToLogin],
  AuthControllers.sendLoginToken
);

export default router;
