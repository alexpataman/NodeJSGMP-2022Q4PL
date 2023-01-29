import { validateSchema } from "../../utils";
import {
  ADD_USERS_TO_GROUP_SCHEMA,
  EXISTING_GROUP_SCHEMA,
  EXISTING_USER_SCHEMA,
  NEW_GROUP_SCHEMA,
  NEW_USER_SCHEMA,
} from "../../constants";

export const validators = {
  addNewUser: validateSchema(NEW_USER_SCHEMA),
  updateExistingUser: validateSchema(EXISTING_USER_SCHEMA),
  addNewGroup: validateSchema(NEW_GROUP_SCHEMA),
  updateExistingGroup: validateSchema(EXISTING_GROUP_SCHEMA),
  addUsersToGroup: validateSchema(ADD_USERS_TO_GROUP_SCHEMA),
};
