import Joi from "joi";
import { PERMISSION_OPTIONS } from "./permission";

const groupFields = {
  name: Joi.string()
    .required()
    .regex(/^[a-zA-Z0-9]{3,30}$/),
  permissions: Joi.array().items(Joi.string().valid(...PERMISSION_OPTIONS)),
};

export const NEW_GROUP_SCHEMA = Joi.object().keys({
  ...groupFields,
});

export const EXISTING_GROUP_SCHEMA = Joi.object().keys({
  id: Joi.string().required(),
  ...groupFields,
});

export const ADD_USERS_TO_GROUP_SCHEMA = Joi.object().keys({
  groupId: Joi.string().required(),
  userIds: Joi.array().items(Joi.string()),
});
