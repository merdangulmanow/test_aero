import { PrismaClient, files, users } from "@prisma/client";
import { extname, resolve } from 'path'
import { existsSync, unlinkSync } from 'fs'
import { IPaginate, IRemoveFile } from "../interfaces/interfaces";
const fileClient= new PrismaClient().files
const userClient= new PrismaClient().users

class FileService {
  async uploadFileService(file: Express.Multer.File, userId: string):Promise<files>{
    try {
      await userClient.findUniqueOrThrow({where: {id: userId}})
      const _file= await fileClient.create({data: {userId: userId, file_extension: extname(file.originalname), mime_type: file.mimetype, original_name: file.originalname, size: file.size, url: file.filename}})
      return _file
    } catch (err) {
      throw {message: err.message, status: err?.status ? err.status: 400, name: ""}
    }
  }

  async fileListService(dto: IPaginate){
    try {
      await userClient.findUniqueOrThrow({where: {id: dto.userId}})
      const count= await fileClient.count({where: {userId: dto.userId}})
      const skip: number= dto.page* dto.list_size- dto.list_size
      const pages= Math.ceil(count/ dto.list_size)
      const rows= await fileClient.findMany({
        where: {userId: dto.userId},
        orderBy: {created_at: "desc"},
        take: dto.list_size, skip: skip,
      })
      return {count, pages, rows}
    } catch (err) {
      throw {message: err.message, status: err?.status ? err.status: 400, name: ""}
    }
  }

  async removeFileService(dto: IRemoveFile){
    try {
      const file= await fileClient.findFirstOrThrow({where: {id: dto.id, userId: dto.userId}})
      const filepath= resolve(__dirname, '..', 'public', file.url)
      unlinkSync(filepath)
      await fileClient.delete({where: {id: dto.id}})
      return {message: "deleted"}
    } catch (err) {
      throw {message: err.message, status: err?.status ? err.status: 400, name: ""}
    }
  }

  async getOneFileService(id: string){
    try {
      return fileClient.findUniqueOrThrow({where: {id: id}})
    } catch (err) {
      throw {message: err.message, status: err?.status ? err.status: 400, name: ""}
    }
  }

  async downloadService(id: string){
    try {
      const file= await this.getOneFileService(id)
      return {url: `${process.env.HOST}:${process.env.PORT}/${file.url}`}
    } catch (err) {
      throw {message: err.message, status: err?.status ? err.status: 400, name: ""}
    }
  }

  async updateFileSerice(file: Express.Multer.File, userId: string, id: string){
    try {
      await fileClient.findFirstOrThrow({where: {id: id, userId: userId}})
      const _file= await fileClient.update({
        where: {id: id},
        data: {file_extension: extname(file.originalname), mime_type: file.mimetype, original_name: file.originalname, size: file.size, url: file.filename}
      })
      return _file
    } catch (err) {
      throw {message: err.message, status: err?.status ? err.status: 400, name: ""}
    }
  }

}

export default new FileService();