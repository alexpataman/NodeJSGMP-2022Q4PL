import express, { Express } from "express";
import cors from "cors";
import routes from "../api";
import config from "../config";
import {
  requestLogger,
  errorHandler,
  executionTimeLogger,
  authorization,
} from "../api/middlewares";

export default (app: Express) => {
  app.use(cors(), express.json(), executionTimeLogger, requestLogger);
  app.use(/^(?!\/user\/login).*/, authorization);
  app.use(config.api.prefix, routes());
  app.use(errorHandler);
};
