import { Express } from "express";

interface ILoaders {
  app: Express;
}

type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";
