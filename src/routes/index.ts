import httpStatus from 'http-status-codes';
import { Application, Request, Response } from 'express';

import userRoutes from './users';
import authRoutes from './auth';

import { defaultErrorHandler } from '../controllers/error';

export const routeConfig = (app: Application) => {
  app.get('/api/check', (_: Request, res: Response) => res.status(httpStatus.OK).send('Health check'));
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);
  app.use(defaultErrorHandler);
};
