import { NextFunction, Request, Response } from "express";
import {
  HTTP_CODE_FORBIDDEN,
  HTTP_CODE_NOT_AUTHORIZED,
  MESSAGE_FORBIDDEN,
  MESSAGE_NOT_AUTHORIZED_ERROR,
} from "../../constants";
import jwt from "jsonwebtoken";
import config from "../../config";

export const authorization = (
  { headers }: Request,
  res: Response,
  next: NextFunction
) => {
  const [_, token] = (headers["authorization"] || "").split(" ");
  if (!token) {
    return res.status(HTTP_CODE_NOT_AUTHORIZED).send({
      success: false,
      message: MESSAGE_NOT_AUTHORIZED_ERROR,
    });
  }

  jwt.verify(token, config.jwt.secret, (error) => {
    if (error) {
      return res.status(HTTP_CODE_FORBIDDEN).send({
        success: false,
        message: MESSAGE_FORBIDDEN,
      });
    }
    return next();
  });
};
