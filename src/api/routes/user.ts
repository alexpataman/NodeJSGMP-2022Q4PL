import { Router } from "express";
import {
  AUTO_SUGGEST_USERS_DEFAULT_LIMIT,
  HTTP_CODE_NOT_FOUND,
  MESSAGE_NOT_FOUND,
} from "../../constants";
import { validators } from "../middlewares";
import { UserService } from "../../services/user";

const USER_PREFIX = "/user";

export const userRouter = (app: Router) => {
  app
    .route(`${USER_PREFIX}/`)
    .get(async (req, res, next) => {
      try {
        return res.send(await UserService.getAllUsers());
      } catch (error) {
        next(error);
      }
    })
    .post(validators.addNewUser, async (req, res, next) => {
      try {
        res.send(await UserService.createUser(req.body));
      } catch (error) {
        next(error);
      }
    });

  app.route(`${USER_PREFIX}/search`).get(async (req, res, next) => {
    const { loginSubstring = "", limit = AUTO_SUGGEST_USERS_DEFAULT_LIMIT } =
      req.query;
    try {
      res.send(
        await UserService.getAutoSuggestUsers(
          String(loginSubstring),
          Number(limit)
        )
      );
    } catch (error) {
      next(error);
    }
  });

  app
    .route(`${USER_PREFIX}/:id`)
    .get(async (req, res, next) => {
      try {
        const user = await UserService.getUserById(req.params.id);
        user
          ? res.send(user)
          : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      } catch (error) {
        next(error);
      }
    })
    .put(validators.updateExistingUser, async (req, res, next) => {
      const {
        params: { id },
        body,
      } = req;
      try {
        const user = await UserService.updateUser(id, body);
        user
          ? res.send(user)
          : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      } catch (error) {
        next(error);
      }
    })
    .delete(async (req, res, next) => {
      const {
        params: { id },
      } = req;
      try {
        const user = await UserService.deleteUser(id);
        user
          ? res.send(user)
          : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      } catch (error) {
        next(error);
      }
    });
};
