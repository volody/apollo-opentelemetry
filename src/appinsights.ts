import * as appInsights from "applicationinsights";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
appInsights.setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING).start();

export const telemetryClient = appInsights.defaultClient;
