import { UserModel } from "../models/user";
import { Op } from "sequelize";
import { User } from "../types";

export default class UserService {
  static getAllUsers() {
    return UserModel.findAll();
  }

  static getUser(id: string) {
    return UserModel.findByPk(id);
  }

  static addUser(data: Omit<User, "id">) {
    return UserModel.create(data);
  }

  static updateUser(id: string, data: User) {
    return UserModel.update(data, {
      where: {
        id,
      },
      returning: true,
    });
  }

  static deleteUser(id: string, data: User) {
    return UserModel.update(
      { ...data, isDeleted: true },
      {
        where: {
          id,
        },
        returning: true,
      }
    );
  }

  static getAutoSuggestUsers(loginSubstring: string, limit: number) {
    return UserModel.findAll({
      where: {
        login: {
          [Op.like]: `%${loginSubstring}%`,
        },
      },
      order: [["login", "ASC"]],
      limit,
    });
  }
}
