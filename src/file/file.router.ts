import { Router } from "express";
import validationMiddleware from '../middleware/validate.middleware'
import { idSchema, paginateSchema } from '../schema/schema'
import authMiddleware from "../middleware/auth.middleware";
import fileUpload from '../middleware/file.upload.middleware'
import fileController from "./file.controller";
export const fileRouter = Router();

fileRouter.post('/upload', authMiddleware, fileUpload().single('image'), fileController.uploadFile)
fileRouter.get('/list', authMiddleware, validationMiddleware(paginateSchema, "query"), fileController.fileList)
fileRouter.get('/download/:id', validationMiddleware(idSchema, 'params'), fileController.downloadFile)
fileRouter.get('/:id', validationMiddleware(idSchema, 'params'), fileController.getOneFile)
fileRouter.delete('/delete/:id', authMiddleware, validationMiddleware(idSchema, 'params'), fileController.removeFile)
fileRouter.put('/update/:id', authMiddleware, fileUpload().single('image'), fileController.updateFile)