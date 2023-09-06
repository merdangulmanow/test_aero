import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { userRouter } from "./user/user.router";
import { fileRouter } from './file/file.router'
import validateEnv from './utils/validateEnv';
import { resolve } from "path";
dotenv.config();
validateEnv();
const PORT: number= parseInt(process.env.PORT as string, 10);
const app= express();

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text({}));
app.use(cors());
app.use(cookieParser());
app.use('/', express.static(resolve(__dirname, 'public')))
app.use("/", userRouter);
app.use("/file", fileRouter);
app.disable("x-powered-by")
  
const start = async () => {
  try {
    app.listen(PORT, () => {
	    console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start()

/// http://localhost:3030/api/authors