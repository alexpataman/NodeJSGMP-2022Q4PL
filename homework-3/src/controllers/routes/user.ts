import { Router } from "express";
import {
  AUTO_SUGGEST_USERS_DEFAULT_LIMIT,
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_NOT_FOUND,
  MESSAGE_NOT_FOUND,
  MESSAGE_SOMETHING_WRONG,
} from "../../constants";
import { validators } from "../middlewares/validators";
import UserService from "../../services/user";

export default (app: Router) => {
  app
    .route("/")
    .get(async (req, res) => {
      return res.send(await UserService.getAllUsers());
    })
    .post(validators.addNewUser, async (req, res) => {
      const result = await UserService.addUser(req.body);
      return result
        ? res.send(result)
        : res.status(HTTP_CODE_BAD_REQUEST).send(MESSAGE_SOMETHING_WRONG);
    });

  app.route("/search").get(async (req, res) => {
    const { loginSubstring = "", limit = AUTO_SUGGEST_USERS_DEFAULT_LIMIT } =
      req.query;

    return res.send(
      await UserService.getAutoSuggestUsers(
        String(loginSubstring),
        Number(limit)
      )
    );
  });

  app
    .route("/:userId")
    .get(async (req, res) => {
      const result = await UserService.getUser(req.params.userId);
      return result
        ? res.send(result)
        : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
    })
    .put(validators.updateExistingUser, async (req, res) => {
      const {
        params: { userId },
        body,
      } = req;
      const [, result] = await UserService.updateUser(userId, body);
      return result
        ? res.send(result)
        : res.status(HTTP_CODE_BAD_REQUEST).send(MESSAGE_SOMETHING_WRONG);
    })
    .delete(async (req, res) => {
      const {
        params: { userId },
        body,
      } = req;
      const [, result] = await UserService.deleteUser(userId, body);
      return result
        ? res.send(result)
        : res.status(HTTP_CODE_BAD_REQUEST).send(MESSAGE_SOMETHING_WRONG);
    });
};
