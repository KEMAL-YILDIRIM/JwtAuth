import { Response } from "express";
import { User } from "../entity/User";
import { createRefreshToken } from "./TokenProvider";


export function setRefreshTokenCookie(response: Response, user: User) {
    response.cookie('jwtAuthCookie', createRefreshToken(user), { httpOnly: true });
}