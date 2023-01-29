import express, { Express } from "express";
import routes from "../controllers";
import config from "../config";

export default (app: Express) => {
  app.use(express.json());
  app.use(config.api.prefix, routes());
};
