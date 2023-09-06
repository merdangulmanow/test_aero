import {Request, Response, NextFunction} from "express";
import UserService from './user.service'
import errorMiddleware from '../middleware/error.middleware'
import RequestWithUser from "../interfaces/requestWithUser.interface";

class UserController {
  
  async signup(req: Request, res: Response){
    try {
      const data= await UserService.SignUpService(req.body)
      return res.status(200).json({status: 200, success: true, data: data})
    } catch (err) {
      return errorMiddleware(err, res)
    }
  }

  async signin(req: Request, res: Response){
    try {
      const data= await UserService.SignInService(req.body)
      res.cookie('refreshToken', data.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.status(200).json({status: 200, success: true, data: data})
    } catch (err) {
      return errorMiddleware(err, res)
    }
  }

  async signout(req: Request, res: Response){
    try {
      res.clearCookie('refreshToken');
      return res.status(200).json({status: 200, success: true, data: {message: "log out ok"}})
    } catch (err) {
      return errorMiddleware(err, res)
    }
  }

  async refreshToken(req: Request, res: Response){
    try {
      const {refreshToken}= req.cookies;
      if(!refreshToken){
        errorMiddleware({message: "not found refresh token", status: 404, name: ""}, res)
      }
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
      return res.status(200).json({status: 200, success: true, data: userData})
    } catch (err) {
      return errorMiddleware(err, res)
    }
  }

  async getInfo(req: RequestWithUser, res: Response){
    try {
      return res.status(200).json({status: 200, success: true, data: {userId: req.user.id}})
    } catch (err) {
      return errorMiddleware(err, res)
    }
  }
}

export default new UserController();