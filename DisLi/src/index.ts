import "dotenv/config";
import { AppDataSource } from "./utils/data-source";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import cors from "cors";
import { person_resolver } from "./resolvers/person_resolver";
// import { friend_resolver } from "./resolvers/test1";

const port = 4003;

(async () => {
  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(cookieParser());

  app.get("/", (_, res) => {
    res.send("SUP");
  });

  AppDataSource.initialize();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [person_resolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(port, () => {
    console.log(`Express is listening on port ${port}`);
  });
})();
