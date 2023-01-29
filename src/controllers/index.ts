import { Router } from "express";
import { userRouter, groupRouter } from "./routes";

export default () => {
  const app = Router();
  userRouter(app);
  groupRouter(app);
  return app;
};
