import { Router } from "express";
import {
  HTTP_CODE_BAD_REQUEST,
  HTTP_CODE_NOT_FOUND,
  MESSAGE_NOT_FOUND,
  MESSAGE_SOMETHING_WRONG,
} from "../../constants";
import { validators } from "../middlewares/validators";
import { GroupService } from "../../services/group";

const GROUP_PREFIX = "/group";

export const groupRouter = (app: Router) => {
  app
    .route(`${GROUP_PREFIX}/`)
    .get(async (req, res) => {
      return res.send(await GroupService.getAllGroups());
    })
    .post(validators.addNewGroup, async (req, res) => {
      const group = GroupService.createGroup(req.body);
      return group
        ? res.send(group)
        : res.status(HTTP_CODE_BAD_REQUEST).send(MESSAGE_SOMETHING_WRONG);
    });

  app
    .route(`${GROUP_PREFIX}/:id`)
    .get(async (req, res) => {
      const group = await GroupService.getGroupById(req.params.id);
      return group
        ? res.send(group)
        : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
    })
    .put(validators.updateExistingGroup, async (req, res) => {
      const {
        params: { id },
        body,
      } = req;
      const group = await GroupService.updateGroup(id, body);
      if (group) {
        res.send(group);
      } else {
        res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      }
    })
    .delete(async (req, res) => {
      const {
        params: { id },
      } = req;
      const group = await GroupService.deleteGroup(id);
      if (group) {
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
      const group = await GroupService.addUsersToGroup(groupId, userIds);
      if (group) {
        res.send(group);
      } else {
        res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      }
    });
};
