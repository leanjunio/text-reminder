import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ValidationError } from 'joi';

import { config } from '../config';

import HttpException from '../exceptions/HttpException';

const log = config.LOG;

export function defaultErrorHandler(err: HttpException, req: Request, res: Response, next: NextFunction) {
  if (err.status === StatusCodes.BAD_REQUEST) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: err });
  } else if (err instanceof ValidationError) {
    log.error(err.message);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: 'There was an error that occurred while attempting to validate the request with Joi.',
      requestBody: req.body,
      params: req.params,
      error: err,
    });
  } else {
    log.error(err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: err.message });
  }
}
