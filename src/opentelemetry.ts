import { NodeSDK } from "@opentelemetry/sdk-node";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { Resource } from "@opentelemetry/resources";
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";
import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";

const azureMonitorExporter = new AzureMonitorTraceExporter({
  connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
});

const sdk = new NodeSDK({
  resource: new Resource({
    [SEMRESATTRS_SERVICE_NAME]: "apollo-server",
  }),
  traceExporter: azureMonitorExporter,
  spanProcessor: new SimpleSpanProcessor(azureMonitorExporter),
  instrumentations: [
    new HttpInstrumentation(),
    new GraphQLInstrumentation({
      mergeItems: true,
    }),
  ],
});

sdk.start();
