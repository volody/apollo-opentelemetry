// src/opentelemetry.ts
import { NodeSDK } from "@opentelemetry/sdk-node";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { Resource } from "@opentelemetry/resources";
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: "apollo-server",
  }),
  traceExporter: new ConsoleSpanExporter(),
  spanProcessor: new SimpleSpanProcessor(new ConsoleSpanExporter()),
  instrumentations: [
    new HttpInstrumentation(),
    new GraphQLInstrumentation({
      mergeItems: true,
    }),
  ],
});

sdk.start();
