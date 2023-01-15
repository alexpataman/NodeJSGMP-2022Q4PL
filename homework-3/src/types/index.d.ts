import { Express } from "express";

interface ILoaders {
  app: Express;
}

export type User = {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
};
