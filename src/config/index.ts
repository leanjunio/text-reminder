import dbConfig, { IDatabaseConfig } from './database';

interface IConfig {
  PORT: number | string;
  DB: IDatabaseConfig;
}

export const config: IConfig = {
  PORT: process.env.PORT ?? 4000,
  DB: dbConfig,
};
