import { NextFunction, Request, Response } from "express";
import { logger, LOGGER_LEVEL } from "../../utils/logger";

export const executionTimeLogger = (
  { method, path, url, body, query }: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = process.hrtime();

  res.on("finish", () => {
    const elapsedTime = process.hrtime(startTime);
    const diff = elapsedTime[0] * 1000 + elapsedTime[1] / 1000000;
    logger.log({
      level: LOGGER_LEVEL.INFO,
      message: `Request: [${method}] ${path}, executed in ${diff} ms`,
      meta: {
        url,
        body,
        query,
        time: diff,
      },
    });
  });

  next();
};
