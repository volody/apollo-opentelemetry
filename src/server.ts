// src/server.ts
import "reflect-metadata"; // Required for TypeGraphQL
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloResolver";

async function startServer() {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
