import { Schema, ValidationErrorItem } from "joi";
import { HTTP_CODE_BAD_REQUEST, VALIDATION_STATUS_FAILED } from "../constants";
import { NextFunction, Request, Response } from "express";

export const validateSchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });
    if (error?.isJoi) {
      return res
        .status(HTTP_CODE_BAD_REQUEST)
        .json(errorResponse(error.details));
    }
    return next();
  };
};

export const errorResponse = (schemaErrors: ValidationErrorItem[]) => {
  const errors = schemaErrors.map(({ path, message }) => ({ path, message }));
  return {
    status: VALIDATION_STATUS_FAILED,
    errors,
  };
};
