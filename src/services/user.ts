import { In, Like } from "typeorm";
import { User } from "../models";
import jwt from "jsonwebtoken";
import config from "../config";
import { generateSalt, hashPassword, isPasswordValid } from "../utils/crypto";

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
    user.salt = generateSalt();
    user.password = hashPassword(user.password, user.salt);
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
  async login(login: string, password: string) {
    const user = await User.findOneBy({ login });
    if (user && isPasswordValid(password, user.salt, user.password)) {
      const payload = { sub: user.id, name: user.login };
      return jwt.sign(payload, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
      });
    }
  },
};
