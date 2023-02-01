import "reflect-metadata";
import dbLoader from "./db";
import expressLoader from "./express";
import { ILoaders } from "../types";

export default async ({ app }: ILoaders) => {
  await dbLoader();
  expressLoader(app);
};
