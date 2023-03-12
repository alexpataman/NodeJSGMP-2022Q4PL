import { Router } from "express";
import { validators } from "../middlewares";
import {
  createUserController,
  deleteUserController,
  getAllUsersController,
  getUserController,
  searchUserController,
  updateUserController,
  userLoginController,
} from "../controllers";

const USER_PREFIX = "/user";

export const userRouter = (app: Router) => {
  app.route(`${USER_PREFIX}/login`).post(userLoginController);

  app
    .route(`${USER_PREFIX}/`)
    .get(getAllUsersController)
    .post(validators.addNewUser, createUserController);

  app.route(`${USER_PREFIX}/search`).get(searchUserController);

  app
    .route(`${USER_PREFIX}/:id`)
    .get(getUserController)
    .put(validators.updateExistingUser, updateUserController)
    .delete(deleteUserController);
};
