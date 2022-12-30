import { Schema, ValidationErrorItem } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { HTTP_CODE_BAD_REQUEST, VALIDATION_STATUS_FAILED } from './constants';
import { randomUUID } from 'crypto';
import { User } from './types';

export const errorResponse = (schemaErrors: ValidationErrorItem[]) => {
    const errors = schemaErrors.map(
        ({ path, message }) => ({ path, message })
    );
    return {
        status: VALIDATION_STATUS_FAILED,
        errors
    };
};

export const validateSchema = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });
        if (error?.isJoi) {
            return res.status(HTTP_CODE_BAD_REQUEST).json(errorResponse(error.details));
        }
        return next();
    };
};

export const generateUserId = () => randomUUID();

export const findById = <T extends { id: string }> (items: T[], id: string) => {
    return items.find((item: T) => item.id === id);
};

export const getAutoSuggestUsers = (users: User[], loginSubstring: string, limit: number) => {
    return users.filter(
        (user) => user.login.indexOf(loginSubstring) !== -1
    )
        .sort()
        .slice(0, limit);
};
