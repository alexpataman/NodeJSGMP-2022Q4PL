import { Router } from "express";
import {
  AUTO_SUGGEST_USERS_DEFAULT_LIMIT,
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_NOT_FOUND,
  MESSAGE_NOT_FOUND,
  MESSAGE_SOMETHING_WRONG,
} from "../../constants";
import { validators } from "../middlewares/validators";
import { User } from "../../models/User";

export default (app: Router) => {
  app
    .route("/")
    .get(async (req, res) => {
      return res.send(await User.find());
    })
    .post(validators.addNewUser, async (req, res) => {
      const user = User.create(req.body as User);
      await user.save();
      return user
        ? res.send(user)
        : res.status(HTTP_CODE_BAD_REQUEST).send(MESSAGE_SOMETHING_WRONG);
    });

  app.route("/search").get(async (req, res) => {
    const { loginSubstring = "", limit = AUTO_SUGGEST_USERS_DEFAULT_LIMIT } =
      req.query;

    return res.send(
      await User.getAutoSuggestUsers(String(loginSubstring), Number(limit))
    );
  });

  app
    .route("/:userId")
    .get(async (req, res) => {
      const result = await User.findOneBy({ id: req.params.userId });
      return result
        ? res.send(result)
        : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
    })
    .put(validators.updateExistingUser, async (req, res) => {
      const {
        params: { userId },
        body,
      } = req;
      const user = await User.findOneBy({ id: userId });
      if (user) {
        User.merge(user, body);
        await user.save();
        res.send(user);
      } else {
        res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      }
    })
    .delete(async (req, res) => {
      const {
        params: { userId },
      } = req;
      const user = await User.findOneBy({ id: userId });
      if (user) {
        await user.delete();
        res.send(user);
      } else {
        res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      }
    });
};
