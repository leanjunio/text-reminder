import * as ReminderValidationSchemas from '../../validations/reminder';
import ValidationMiddleware from './index';

const ReminderValidations = {
  addReminder: ValidationMiddleware(ReminderValidationSchemas.addReminderSchema),
  updateReminder: ValidationMiddleware(ReminderValidationSchemas.sendLoginTokenSchema),
  deleteReminder: ValidationMiddleware(ReminderValidationSchemas.verifyLoginTokenSchema),
  getReminder: ValidationMiddleware(ReminderValidationSchemas.verifyLoginTokenSchema),
};

export default ReminderValidations;
