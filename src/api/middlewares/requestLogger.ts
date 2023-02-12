import { NextFunction, Request, Response } from "express";
import { logger, LOGGER_LEVEL } from "../../utils/logger";

export const requestLogger = (
  { method, path, url, body, query }: Request,
  res: Response,
  next: NextFunction
) => {
  logger.log({
    level: LOGGER_LEVEL.INFO,
    message: `Request: [${method}] ${path}`,
    meta: {
      url,
      body,
      query,
    },
  });
  return next();
};
