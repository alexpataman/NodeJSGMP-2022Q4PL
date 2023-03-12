import { UserService } from "../../services";
import {
  AUTO_SUGGEST_USERS_DEFAULT_LIMIT,
  HTTP_CODE_FORBIDDEN,
  HTTP_CODE_NOT_FOUND,
  MESSAGE_FORBIDDEN,
  MESSAGE_NOT_FOUND,
} from "../../constants";
import { NextFunction, Request, Response } from "express";

export const userLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { login, password } = req.body || {};

  try {
    const token = await UserService.login(login, password);
    token
      ? res.send(token)
      : res.status(HTTP_CODE_FORBIDDEN).send(MESSAGE_FORBIDDEN);
  } catch (error) {
    next(error);
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(await UserService.getAllUsers());
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    user
      ? res.send(user)
      : res.status(HTTP_CODE_NOT_FOUND).send(MESSAGE_NOT_FOUND);
  } catch (error) {
    next(error);
  }
};

export const searchUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send(await UserService.createUser(req.body));
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
