import { Response } from "express";
import {_constants} from "./Constants";


export function setRefreshToken(response: Response, token: String) {
    response.cookie(_constants.JwtTokenName, token, { httpOnly: true });
}