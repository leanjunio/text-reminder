import winston from 'winston';
import fs from 'fs';
import path from 'path';

const logDirectory = 'logs';

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: path.join(logDirectory, './error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDirectory, './combined.log') }),
  ],
  exceptionHandlers: [new winston.transports.File({ filename: path.join(logDirectory, '/rejections.log') })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
