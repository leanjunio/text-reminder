import { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: resolve(__dirname, '../.env') });

import app from './app';
import { config } from './config';

app.listen(config.PORT);
