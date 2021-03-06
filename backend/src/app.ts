import express, { Application } from 'express';
import bodyParser from 'body-parser';

import { routeConfig } from './routes/index';
import * as db from './db';

import * as CronServices from './services/cron';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routeConfig(app);
db.connect();

(async () => {
  await CronServices.sendAllRemindersToUsers();
})();

export default {
  listen: (port: number | string) => app.listen(port, () => console.log(`Running on port: ${port}`)),
};
