import { Router } from "express";
import {
  AUTO_SUGGEST_USERS_DEFAULT_LIMIT,
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_NOT_FOUND,
  MESSAGE_NOT_FOUND,
  MESSAGE_SOMETHING_WRONG,
} from "../../constants";
import { validators } from "../middlewares/validators";
import { User } from "../../models";

const USER_PREFIX = "/user";

export const userRouter = (app: Router) => {
  app
    .route(`${USER_PREFIX}/`)
    .get(async (req, res) => {
      return res.send(
        await User.find({
          relations: {
            groups: true,
          },
        })
      );
    })
    .post(validators.addNewUser, async (req, res) => {
      const user = User.create(req.body as User);
      await user.save();
      return user
        ? res.send(user)
        : res.status(HTTP_CODE_BAD_REQUEST).send(MESSAGE_SOMETHING_WRONG);
    });

  app.route(`${USER_PREFIX}/search`).get(async (req, res) => {
    const { loginSubstring = "", limit = AUTO_SUGGEST_USERS_DEFAULT_LIMIT } =
      req.query;

    return res.send(
      await User.getAutoSuggestUsers(String(loginSubstring), Number(limit))
    );
  });

  app
    .route(`${USER_PREFIX}/:id`)
    .get(async (req, res) => {
      const result = await User.findOneBy({ id: req.params.id });
      return result
        ? res.send(result)
        : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
    })
    .put(validators.updateExistingUser, async (req, res) => {
      const {
        params: { id },
        body,
      } = req;
      const user = await User.findOneBy({ id });
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
        params: { id },
      } = req;
      const user = await User.findOneBy({ id });
      if (user) {
        await user.delete();
        res.send(user);
      } else {
        res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      }
    });
};
