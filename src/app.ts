import express, { Application } from 'express';
import bodyParser from 'body-parser';

import { routeConfig } from './routes/index';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routeConfig(app);

export default {
  listen: (port: number | string) => app.listen(port, () => console.log(`Running on port: ${port}`)),
};
