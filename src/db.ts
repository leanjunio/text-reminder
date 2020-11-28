import { func } from 'joi';
import mongoose from 'mongoose';

import { config } from './config';

const DATABASE = config.DB.URI;
const log = config.LOG;

export function connect() {
  mongoose.connect(config.DB.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    keepAlive: true,
  });

  mongoose.connection.on('connecting', () => log.info(`Attempting DB connection: ${DATABASE}`));
  mongoose.connection.on('connected', () => log.info(`Connected to: ${DATABASE}`));
  mongoose.connection.on('error', err => log.error(err));
}

export function close() {
  mongoose.connection.close(() => log.info('Mongoose disconnected'));
}
