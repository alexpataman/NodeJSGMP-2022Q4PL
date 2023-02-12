import "reflect-metadata";
import dbLoader from "./db";
import expressLoader from "./express";
import unhandledErrorHandler from "./unhandledErrorHandler";
import { ILoaders } from "../types";

export default async ({ app }: ILoaders) => {
  unhandledErrorHandler();
  await dbLoader();
  expressLoader(app);
};
