import { ApolloServer } from "apollo-server-express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import "dotenv/config";
import express from "express";
import { verify } from "jsonwebtoken";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { _constants } from "./helpers/Constants";
import { setRefreshToken } from "./helpers/CookieManager";
import { createAccessToken, createRefreshToken } from "./helpers/TokenProvider";
import { UserResolver } from "./resolvers/UserResolver";


(async () => {
    const app = express();
    app.use(
        cors({
            credentials: true,
            origin: _constants.origin
        })
    );
    app.use(cookieParser());

    const port = _constants.appServerPort;
    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.get("/",
        (_request, response) => {
            response.send("Empty get method.")
        });

    app.post("/refresh_token", async (_request, _response) => {
        const token = _request.cookies.jwtAuthCookie;
        if (!token) {
            console.error({ TokenMissingInRefreshCookie: token })
            return _response.send({
                ok: false,
                accessToken: ''
            });
        }

        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
        } catch (error) {
            console.error({ PayloadTokenVerifyError: error });
            return _response.send({
                ok: false,
                accessToken: ''
            });
        }

        const user = await User.findOne({ id: payload.userId });
        if (!user) {
            console.error({ PayloadUserNotFound: user });
            return _response.send({
                ok: false,
                accessToken: ''
            });
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            console.error({ UserTokenVersion: user.tokenVersion, payloadTokenVersion: payload.tokenVersion });
            return _response.send({
                ok: false,
                accessToken: ''
            });
        }

        setRefreshToken(_response, createRefreshToken(user));

        return _response.send({
            ok: true,
            accessToken: createAccessToken(user)
        });
    });

    app.listen(port,
        () => {
            console.log(`Express app listening on port ${port}`);
        });

})()