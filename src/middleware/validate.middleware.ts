import {Request, Response, NextFunction} from "express"
import errorMiddleware from "./error.middleware";

const validationMiddleware = (schema: any, property: "body" | "query" | "params") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (valid) {
      next();
    } else {
      return errorMiddleware({status: 406, message: error.details[0].message, name: ""}, res)
    }
  }
}

export default validationMiddleware