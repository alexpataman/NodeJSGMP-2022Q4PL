import expressLoader from "./express";
import { Express } from "express";

interface ILoaders {
  app: Express;
}

export default async ({ app }: ILoaders) => {
  await expressLoader(app);
};
