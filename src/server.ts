// src/server.ts
import "reflect-metadata"; // Required for TypeGraphQL
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/HelloResolver";
import { telemetryClient } from "./appinsights"; // Import the telemetry client
import { GraphQLRequestContext } from "apollo-server-core";

async function startServer() {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      // Add telemetry client to the context
      return { telemetryClient };
    },
    formatError: (error) => {
      // Log errors to Application Insights
      telemetryClient.trackException({ exception: error });
      return error;
    },
    plugins: [
      {
        async requestDidStart(requestContext: GraphQLRequestContext) {
          telemetryClient.trackEvent({
            name: "GraphQL Request Started",
            properties: {
              query: requestContext.request.query,
            },
          });
        },
      },
    ],
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

startServer();
