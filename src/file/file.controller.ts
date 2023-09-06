import {Request, Response } from "express";
import errorMiddleware from '../middleware/error.middleware'
import FileService from './file.service'
import RequestWithUser from "../interfaces/requestWithUser.interface";
import { IPaginate } from "../interfaces/interfaces";

class FileController {

  filename(_req: Request, file: Express.Multer.File, cb: (error: Error|null, name: string) => void) {
    console.log("file will be named " + file.originalname);
    cb(null, file.originalname);
  }


  async uploadFile(req: RequestWithUser, res: Response){
    try {
      if(!req.file){
        errorMiddleware({message: "not found image", status: 404, name: ""}, res)
      }
      const data= await FileService.uploadFileService(req.file, req.user.id)
      return res.status(200).json({status: 200, success: true, data: data})
    } catch (err) {
      return errorMiddleware(err, res)
    }
  }

  async fileList(req: RequestWithUser, res: Response){
    try {
      const dto: IPaginate={
        list_size: req.query?.list_size ? Number(req.query.list_size) : 10,
        page: req.query?.page ? Number(req.query.page) : 1,
        userId: req.user.id
      }
      const data= await FileService.fileListService(dto)
      return res.status(200).json({status: 200, success: true, data: data})
    } catch (err) {
      return errorMiddleware(err, res)
    }
  }

  async removeFile(req: RequestWithUser, res: Response){
    try {
      const data= await FileService.removeFileService({id: req.params.id, userId: req.user.id})
      return res.status(200).json({status: 200, success: true, data: data})
    } catch (err) {
      return errorMiddleware(err, res)
    }
  }

  async getOneFile(req: RequestWithUser, res: Response){
    try {
      const data= await FileService.getOneFileService(req.params.id)
      return res.status(200).json({status: 200, success: true, data: data})
    } catch (err) {
      return errorMiddleware(err, res)
    }
  }

  async downloadFile(req: RequestWithUser, res: Response){
    try {
      const data= await FileService.downloadService(req.params.id)
      return res.status(200).json({status: 200, success: true, data: data})
    } catch (err) {
      return errorMiddleware(err, res)
    }
  }

  async updateFile(req: RequestWithUser, res: Response){
    try {
      if(!req.file){
        errorMiddleware({message: "not found image", status: 404, name: ""}, res)
      }
      const data= await FileService.updateFileSerice(req.file, req.user.id, req.params.id)
      return res.status(200).json({status: 200, success: true, data: data})
    } catch (err) {
      return errorMiddleware(err, res)
    }
  }
}

export default new FileController();