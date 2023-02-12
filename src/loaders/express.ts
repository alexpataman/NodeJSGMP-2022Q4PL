import express, { Express } from "express";
import routes from "../api";
import config from "../config";
import {
  requestLogger,
  errorHandler,
  executionTimeLogger,
} from "../api/middlewares";

export default (app: Express) => {
  app.use(express.json(), executionTimeLogger, requestLogger);
  app.use(config.api.prefix, routes());
  app.use(errorHandler);
};
