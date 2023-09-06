import {resolve, extname} from 'path'
import multer from 'multer';
import {existsSync, mkdirSync} from 'fs'
import {v4} from 'uuid'
import {Request, Response} from 'express'

export default function() {
  const filepath= resolve(__dirname, '..', 'public')
  if(!existsSync(filepath)){
    mkdirSync(filepath, {recursive : true})
  }

  return multer({
    storage: multer.diskStorage({
      destination: function (req: Request, file: Express.Multer.File, cb) {
        cb(null, resolve(__dirname, '..', 'public'))
      },
      filename: function (req, file, cb) {
        var filename= v4()+ extname(file.originalname)
        cb(null, filename)
      }
    }),
  })
}