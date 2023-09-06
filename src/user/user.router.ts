import { Router } from "express";
import UserController from './user.controller'
import validationMiddleware from '../middleware/validate.middleware'
import {signUpSchema} from '../schema/schema'
import authMiddleware from "../middleware/auth.middleware";
import userController from "./user.controller";
export const userRouter = Router();

userRouter.post('/signup', validationMiddleware(signUpSchema, "body"), UserController.signup)
userRouter.post('/signin', validationMiddleware(signUpSchema, "body"), UserController.signin)
userRouter.post('/signin/new_token', userController.refreshToken)
userRouter.get('/info', authMiddleware, userController.getInfo)
userRouter.get('/logout', authMiddleware, userController.signout)