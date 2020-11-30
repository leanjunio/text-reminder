import httpStatus from 'http-status-codes';
import { Application, Request, Response } from 'express';

import authRoutes from './auth';
import reminderRoutes from './reminder';

import { defaultErrorHandler } from '../controllers/error';

export const routeConfig = (app: Application) => {
  app.get('/api/check', (_: Request, res: Response) => res.status(httpStatus.OK).send('Health check'));
  app.use('/auth', authRoutes);
  app.use('/reminder', reminderRoutes);
  app.use(defaultErrorHandler);
};
