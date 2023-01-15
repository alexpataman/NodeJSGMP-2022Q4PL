import { validateSchema } from "../../utils";
import { EXISTING_USER_SCHEMA, NEW_USER_SCHEMA } from "../../constants";

export const validators = {
  addNewUser: validateSchema(NEW_USER_SCHEMA),
  updateExistingUser: validateSchema(EXISTING_USER_SCHEMA),
};
