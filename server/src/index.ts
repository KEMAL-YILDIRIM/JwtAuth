import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import UserResolver from "./UserResolver";
import { createConnection } from "typeorm";


(async () => {
    const app = express();
    const port = 4000;
    
    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver]
        })
    });

    apolloServer.applyMiddleware({ app });

    app.get("/",
        (_request, response) => {
            response.send("Empty get method.")
        });

    app.listen(port,
        () => {
            console.log(`Express app listening on port ${port}`);
        });

})()