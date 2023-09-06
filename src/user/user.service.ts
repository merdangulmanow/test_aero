import {IToken, signUp} from '../interfaces/interfaces'
import {hash, compareSync} from 'bcrypt'
import TokenService from './token.service'
import { PrismaClient, users } from "@prisma/client";
const userClient = new PrismaClient().users

class UserService {

  async SignUpService(dto: signUp):Promise<users>{
    try {
      let condidate= await userClient.findFirst({where: {id: dto.id}})
      if(condidate){
        throw {message: `${dto.id} already exists`, status: 409, name: ""}
      }
      let hashed= await hash(dto.password, 5)
      const user= await userClient.create({data: {...dto, password: hashed}})
      return user
    } catch (err) {
      throw {message: err.message, status: err?.status ? err.status: 400, name: ""}
    }
  }

  async SignInService(dto: signUp):Promise<IToken>{
    try {
      let condidate= await userClient.findFirstOrThrow({where: {id: dto.id}})
      let comparePassword= await compareSync(dto.password, condidate.password)
      if(!comparePassword){
        throw {message: `invalid user data`, status: 501, name: ""}
      }
      return TokenService.generateToken(condidate)
    } catch (err) {
      throw {message: err.message, status: err?.status ? err.status: 400, name: ""}
    }
  }

  async refresh(refreshToken: string){
    try {
      if (!refreshToken) {
        throw {message: `invalid user data`, status: 501, name: ""}
      }
      const userId= TokenService.validateRefreshToken(refreshToken);
      const user= await userClient.findFirstOrThrow({where: {id: userId}})
      const tokens = TokenService.generateToken(user);
      return {...tokens, ...user}
    } catch (err) {
      throw {message: err.message, status: err?.status ? err.status: 400, name: ""}
    }
  }

}

export default new UserService();