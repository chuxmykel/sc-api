import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import debug from 'debug';
import chalk from 'chalk';
import { config } from 'dotenv';
import v1routes from './v1/routes';

config();

const isProduction = process.env.NODE_ENV === 'production';
const app = express();
const print = debug('dev');
const port = process.env.PORT;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

if (!isProduction) {
  app.use(errorhandler());
}

app.get('/', (_req, res) => res.status(301).redirect('/api/v1'));

app.use('/api/v1', v1routes);

app.use('*', (_req, res) =>
  res.status(404).json({
    status: res.statusCode,
    error: 'Resource not found. Double check the url and try again',
  }),
);

app.use((err, _req, res, next) => {
  if (!isProduction) print(err.stack);
  if (res.headersSent) return next(err);
  return res.status(err.status || 500).json({
    status: res.statusCode,
    error: isProduction ? 'Internal server error' : err.message,
  });
});

app.listen(port, () => {
  print(`Listening on port ${chalk.yellow(port)}`);
});

export default app;
