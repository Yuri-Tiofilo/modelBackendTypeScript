import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';

import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/appError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/files', express.static(uploadConfig.uploadFolder));

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server -> status: Active');
});
