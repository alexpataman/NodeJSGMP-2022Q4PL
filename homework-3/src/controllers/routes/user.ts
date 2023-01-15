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
  app.get("/", async (req, res) => {
    return res.send(await UserService.getAllUsers());
  });

  app.get("/search", async (req, res) => {
    const { loginSubstring = "", limit = AUTO_SUGGEST_USERS_DEFAULT_LIMIT } =
      req.query;

    return res.send(
      await UserService.getAutoSuggestUsers(
        String(loginSubstring),
        Number(limit)
      )
    );
  });

  app.get("/:userId", async (req, res) => {
    const result = await UserService.getUser(req.params.userId);
    return result
      ? res.send(result)
      : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
  });

  app.post("/", validators.addNewUser, async (req, res) => {
    const result = await UserService.addUser(req.body);
    return result
      ? res.send(result)
      : res.status(HTTP_CODE_BAD_REQUEST).send(MESSAGE_SOMETHING_WRONG);
  });

  app.put("/:userId", validators.updateExistingUser, async (req, res) => {
    const {
      params: { userId },
      body,
    } = req;
    const [, result] = await UserService.updateUser(userId, body);
    return result
      ? res.send(result)
      : res.status(HTTP_CODE_BAD_REQUEST).send(MESSAGE_SOMETHING_WRONG);
  });

  app.delete("/:userId", async (req, res) => {
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
