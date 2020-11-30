import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationResult } from 'joi';

export default (schema: ObjectSchema) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const validationError: ValidationResult = schema.validate(req.body);
    next(validationError.error);
  };
};
