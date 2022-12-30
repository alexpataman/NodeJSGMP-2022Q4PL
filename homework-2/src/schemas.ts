import Joi from 'joi';

const userFields = {
    login: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/),
    password: Joi.string().required().regex(/^[a-zA-Z0-9]{6,12}$/),
    age: Joi.number().required().integer().min(4).max(130),
    isDeleted: Joi.boolean().required()
};

export const newUserSchema = Joi.object().keys({
    ...userFields
});

export const existingUserSchema = Joi.object().keys({
    id: Joi.string().required(),
    ...userFields
});
