import { sign } from "jsonwebtoken";
import { User } from "src/entity/User";


export const createAccessToken = (user: User) => {
    return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '3d' });
}

export const createRefreshToken = (user: User) => {
    return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '20m' });
}