import * as UserValidationSchemas from '../../validations/user';
import ValidationMiddleware from './index';

const UserValidation = {
  registerUser: ValidationMiddleware(UserValidationSchemas.userRegistrationSchema),
  sendLoginToken: ValidationMiddleware(UserValidationSchemas.sendLoginTokenSchema),
  verifyLoginToken: ValidationMiddleware(UserValidationSchemas.verifyLoginTokenSchema),
};

export default UserValidation;
