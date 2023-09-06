import { users } from "@prisma/client";
import { sign, verify } from 'jsonwebtoken'
import { IToken } from "../interfaces/interfaces";

class TokenService {
  generateToken(user: users):IToken{
    try {
      const accessToken= sign({id: user.id}, process.env.JWT_ACCESS_SECRET, {expiresIn: '10m'})
      const refreshToken= sign({id: user.id}, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
      return {accessToken, refreshToken}
    } catch (err) {
      throw err
    }
  }

  validateRefreshToken(token: string) {
    try {
      const userData:any = verify(token, process.env.JWT_REFRESH_SECRET);
      return userData.id;
    } catch (err) {
      return null;
    }
  }
}

export default new TokenService();