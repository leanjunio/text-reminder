export interface IDatabaseConfig {
  HOST: string;
  PORT: string;
  USER: string;
  PASSWORD: string;
  NAME: string;
  URI: string;
}

const config: IDatabaseConfig = {
  HOST: process.env.DB_HOST ?? 'localhost',
  PORT: process.env.DB_PORT ?? '27017',
  USER: process.env.DB_USER ?? 'test',
  PASSWORD: process.env.DB_PASSWORD ?? 'test',
  NAME: process.env.DB_NAME ?? 'text-reminder',
  URI: '',
};

let uri = '';

if (config.USER && config.PASSWORD) {
  uri = process.env.DB_URI ?? `mongodb://${config.USER}:${config.PASSWORD}@${config.HOST}/${config.NAME}`;
}

config.URI = uri;

export default config;
