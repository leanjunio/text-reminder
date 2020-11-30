import { Logger } from 'winston';
import dbConfig, { IDatabaseConfig } from './database';

import logger from './logger';

interface IConfig {
  PORT: number | string;
  DB: IDatabaseConfig;
  LOG: Logger;
}

export const config: IConfig = {
  PORT: process.env.PORT ?? 4000,
  DB: dbConfig,
  LOG: logger,
};
