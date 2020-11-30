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
  [UserValidation.sendLoginToken, UserMiddlewares.isAbleToLogin],
  AuthControllers.sendLoginToken
);

router.post('/login/token/verify', [UserValidation.verifyLoginToken], AuthControllers.verifyLoginToken);

export default router;
