import express, { Express } from "express";
import routes from "../api";
import config from "../config";

export default (app: Express) => {
  app.use(express.json());
  app.use(config.api.prefix, routes());
};
