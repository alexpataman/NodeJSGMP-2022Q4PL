import { In, Like } from "typeorm";
import { User } from "../models";

export const UserService = {
  async getAllUsers() {
    return await User.find({
      relations: {
        groups: true,
      },
    });
  },
  async getUserById(id: string) {
    return await User.findOneBy({ id });
  },
  async getUsersByIds(ids: string[]) {
    return await User.findBy({ id: In(ids) });
  },
  async createUser(data: User) {
    const user = User.create(data);
    await user.save();
    return user;
  },
  async updateUser(id: string, data: User) {
    const user = await User.findOneBy({ id });
    if (user) {
      User.merge(user, data);
      await user.save();
      return user;
    }
  },
  async deleteUser(id: string) {
    const user = await User.findOneBy({ id });
    if (user) {
      await user.delete();
      return user;
    }
  },
  async getAutoSuggestUsers(loginSubstring: string, limit: number) {
    return await User.find({
      where: {
        login: Like(`%${loginSubstring}%`),
      },
      order: { login: "ASC" },
      take: limit,
    });
  },
};
