import "dotenv/config";
import "reflect-metadata";
import express from "express";
import cookieParser from 'cookie-parser';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/UserResolver";
import { verify } from "jsonwebtoken";
import { createAccessToken, createRefreshToken } from "./helpers/TokenProvider";
import { User } from "./entity/User";
import { setRefreshToken } from "./helpers/CookieManager";
import { _constants } from "./helpers/Constants";


(async () => {
    const app = express();
    const port = _constants.AppServerPort;
    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app });

    app.use(cookieParser());

    app.get("/",
        (_request, response) => {
            response.send("Empty get method.")
        });

    app.post("/refresh_token", async (_request, _response) => {
        const token = _request.cookies.jwtAuthCookie;
        if (!token) {
            return _response.send({
                ok: false,
                accessToken: ''
            });
        }

        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!)
        } catch (error) {
            console.log(error);
            return _response.send({
                ok: false,
                accessToken: ''
            });
        }

        const user = await User.findOne({ id: payload.userId });
        if (!user)
            return _response.send({
                ok: false,
                accessToken: ''
            });

        if (user.tokenVersion !== payload.tokenVersion)
            return _response.send({
                ok: false,
                accessToken: ''
            });

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