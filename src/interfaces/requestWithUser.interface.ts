import { Request } from 'express';
import {IUser} from './interfaces'

interface RequestWithUser extends Request {
  user: IUser;
}

export default RequestWithUser;
