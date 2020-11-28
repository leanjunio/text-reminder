import * as UserValidationSchemas from '../../validations/user';
import ValidationMiddleware from './index';

const UserValidation = {
  registerUser: ValidationMiddleware(UserValidationSchemas.userRegistrationSchema),
};

export default UserValidation;
