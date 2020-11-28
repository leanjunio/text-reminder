import * as UserValidationSchemas from '../../validations/user';
import ValidationMiddleware from './index';

export default {
  registerUser: ValidationMiddleware(UserValidationSchemas.userRegistrationSchema),
};
