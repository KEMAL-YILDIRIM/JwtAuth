import {Request, Response} from 'express';

export interface applicationContext {
    request : Request;
    response : Response;
}