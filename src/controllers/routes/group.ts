import { Router } from "express";
import {
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_NOT_FOUND,
  MESSAGE_NOT_FOUND,
  MESSAGE_SOMETHING_WRONG,
} from "../../constants";
import { validators } from "../middlewares/validators";
import { Group, User } from "../../models";
import { In } from "typeorm";

const GROUP_PREFIX = "/group";

export const groupRouter = (app: Router) => {
  app
    .route(`${GROUP_PREFIX}/`)
    .get(async (req, res) => {
      return res.send(
        await Group.find({
          relations: {
            users: true,
          },
        })
      );
    })
    .post(validators.addNewGroup, async (req, res) => {
      const group = Group.create(req.body as Group);
      await group.save();
      return group
        ? res.send(group)
        : res.status(HTTP_CODE_BAD_REQUEST).send(MESSAGE_SOMETHING_WRONG);
    });

  app
    .route(`${GROUP_PREFIX}/:id`)
    .get(async (req, res) => {
      const result = await Group.findOneBy({ id: req.params.id });
      return result
        ? res.send(result)
        : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
    })
    .put(validators.updateExistingGroup, async (req, res) => {
      const {
        params: { id },
        body,
      } = req;
      const group = await Group.findOneBy({ id });
      if (group) {
        Group.merge(group, body);
        await group.save();
        res.send(group);
      } else {
        res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      }
    })
    .delete(async (req, res) => {
      const {
        params: { id },
      } = req;
      const group = await Group.findOneBy({ id });
      if (group) {
        await group.remove();
        res.send(group);
      } else {
        res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      }
    });

  app
    .route(`${GROUP_PREFIX}/addUsersToGroup`)
    .post(validators.addUsersToGroup, async (req, res) => {
      const {
        body: { groupId, userIds },
      } = req;
      const group = await Group.findOneBy({ id: groupId });
      const users = await User.findBy({ id: In(userIds) });
      if (group && users.length) {
        group.users = users;
        await group.save();
        res.send(group);
      } else {
        res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      }
    });
};
