import { Router } from "express";
import { HTTP_CODE_NOT_FOUND, MESSAGE_NOT_FOUND } from "../../constants";
import { validators } from "../middlewares";
import { GroupService } from "../../services/group";

const GROUP_PREFIX = "/group";

export const groupRouter = (app: Router) => {
  app
    .route(`${GROUP_PREFIX}/`)
    .get(async (req, res, next) => {
      try {
        res.send(await GroupService.getAllGroups());
      } catch (error) {
        next(error);
      }
    })
    .post(validators.addNewGroup, async (req, res, next) => {
      try {
        res.send(GroupService.createGroup(req.body));
      } catch (error) {
        next(error);
      }
    });

  app
    .route(`${GROUP_PREFIX}/:id`)
    .get(async (req, res, next) => {
      try {
        const group = await GroupService.getGroupById(req.params.id);
        group
          ? res.send(group)
          : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      } catch (error) {
        next(error);
      }
    })
    .put(validators.updateExistingGroup, async (req, res, next) => {
      const {
        params: { id },
        body,
      } = req;
      try {
        const group = await GroupService.updateGroup(id, body);
        group
          ? res.send(group)
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
        const group = await GroupService.deleteGroup(id);
        group
          ? res.send(group)
          : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      } catch (error) {
        next(error);
      }
    });

  app
    .route(`${GROUP_PREFIX}/addUsersToGroup`)
    .post(validators.addUsersToGroup, async (req, res, next) => {
      const {
        body: { groupId, userIds },
      } = req;
      try {
        const group = await GroupService.addUsersToGroup(groupId, userIds);
        group
          ? res.send(group)
          : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
      } catch (error) {
        next(error);
      }
    });
};
