import httpStatus from 'http-status-codes';
import { Application, Request, Response } from 'express';

import userRoutes from './users';

export const routeConfig = (app: Application) => {
  app.get('/api/check', (_: Request, res: Response) => res.status(httpStatus.OK).send('Health check'));
  app.use('/users', userRoutes);
};
