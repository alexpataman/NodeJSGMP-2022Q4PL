import { GroupService } from "../../services";
import { NextFunction, Request, Response } from "express";
import { HTTP_CODE_NOT_FOUND, MESSAGE_NOT_FOUND } from "../../constants";

export const getAllGroupsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(await GroupService.getAllGroups());
  } catch (error) {
    next(error);
  }
};

export const getGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const group = await GroupService.getGroupById(req.params.id);
    group
      ? res.send(group)
      : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
  } catch (error) {
    next(error);
  }
};

export const createGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(await GroupService.createGroup(req.body));
  } catch (error) {
    next(error);
  }
};

export const updateGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const deleteGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const addUsersToGroupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
