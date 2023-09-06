import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import errorMiddleware from './error.middleware';
import { PrismaClient } from "@prisma/client";
const userClient = new PrismaClient().users

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const headers= request.headers;
  try {
    const verificationResponse: any = jwt.verify(headers.authorization, process.env.JWT_ACCESS_SECRET);
    const user= await userClient.findUniqueOrThrow({where: {id: verificationResponse.id}});
    request.user= user;
    next();
  } catch (error) {
    errorMiddleware(error, response)
  }
}

export default authMiddleware;
