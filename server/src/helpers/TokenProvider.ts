import { sign } from "jsonwebtoken";
import { User } from "../entity/User";
import { _constants } from "./Constants";


export const createAccessToken = (user: User) => {
    return sign(
        { userId: user.id }, 
        process.env.ACCESS_TOKEN_SECRET!, 
        { 
            expiresIn: _constants.accessTokenExpirationTime 
        });
}

export const createRefreshToken = (user: User) => {
    return sign(
        { 
            userId: user.id, 
            tokenVersion: user.tokenVersion 
        }, 
        process.env.REFRESH_TOKEN_SECRET!, 
        { 
            expiresIn: _constants.refreshTokenExpirationTime 
        });
}
