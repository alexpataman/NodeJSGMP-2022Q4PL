import { Router } from "express";
import { validators } from "../middlewares";
import {
  addUsersToGroupController,
  createGroupController,
  deleteGroupController,
  getAllGroupsController,
  getGroupController,
  updateGroupController,
} from "../controllers";

const GROUP_PREFIX = "/group";

export const groupRouter = (app: Router) => {
  app
    .route(`${GROUP_PREFIX}/`)
    .get(getAllGroupsController)
    .post(validators.addNewGroup, createGroupController);

  app
    .route(`${GROUP_PREFIX}/:id`)
    .get(getGroupController)
    .put(validators.updateExistingGroup, updateGroupController)
    .delete(deleteGroupController);

  app
    .route(`${GROUP_PREFIX}/addUsersToGroup`)
    .post(validators.addUsersToGroup, addUsersToGroupController);
};
