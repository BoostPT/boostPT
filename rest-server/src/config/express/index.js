import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import router from '../../routes';

const restServer = express();

const middleWare = [
  helmet(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
  cors({
    allowedHeaders: 'Content-Type, Authorization',
    methods: ['GET, POST, PUT, DELETE', 'OPTIONS'],
  })
];

restServer.use(...middleWare);

if (process.env.DEBUG === 'TRUE') {
  const morgan = require('morgan');
  restServer.use(morgan('dev'));
}

restServer.use('/api', router);

export default restServer;