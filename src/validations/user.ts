import joi from 'joi';

export const userValidationSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  mobile: joi.string().required(),
});
