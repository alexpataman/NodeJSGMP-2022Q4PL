import expressLoader from "./express";
import { ILoaders } from "../types";

export default async ({ app }: ILoaders) => {
  await expressLoader(app);
};
