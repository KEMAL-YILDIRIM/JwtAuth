import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/UserResolver";


(async () => {
    const app = express();
    const port = 4000;
    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        }),
        context: ({ req, res }) => ({ req, res })
    });

    apolloServer.applyMiddleware({ app });

    app.get("/",
        (_request, response) => {
            response.send("Empty get method.")
        });

    app.post("/refresh_token", (_request) => {
        console.log(_request.headers);
    });

    app.listen(port,
        () => {
            console.log(`Express app listening on port ${port}`);
        });

})()