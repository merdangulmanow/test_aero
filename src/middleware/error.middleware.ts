import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

function errorMiddleware(error: HttpException, response: Response) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  return response
    .status(status)
    .send({
      status,
      success: false,
      message
    });
}

export default errorMiddleware;
