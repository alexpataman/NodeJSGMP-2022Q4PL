import { NextFunction, Request, Response } from "express";
import { logger, LOGGER_LEVEL } from "../../utils/logger";
import {
  HTTP_CODE_INTERNAL_SERVER_ERROR,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from "../../constants";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const { method, path, url, body, query } = req;
  logger.log({
    level: LOGGER_LEVEL.ERROR,
    message: error.message,
    meta: {
      method,
      path,
      url,
      body,
      query,
    },
  });
  res
    .status(HTTP_CODE_INTERNAL_SERVER_ERROR)
    .send(MESSAGE_INTERNAL_SERVER_ERROR);
};
