import "reflect-metadata";
import expressLoader from "./express";
import { ILoaders } from "../types";
import AppDataSource from "./db";

export default async ({ app }: ILoaders) => {
  await AppDataSource.initialize();
  await expressLoader(app);
};
