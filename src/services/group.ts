import { Group } from "../models";
import { UserService } from "./user";

export const GroupService = {
  async getAllGroups() {
    return await Group.find({
      relations: {
        users: true,
      },
    });
  },
  async getGroupById(id: string) {
    return await Group.findOneBy({ id });
  },
  async createGroup(data: Group) {
    const user = Group.create(data);
    await user.save();
    return user;
  },
  async updateGroup(id: string, data: Group) {
    const user = await this.getGroupById(id);
    if (user) {
      Group.merge(user, data);
      await user.save();
      return user;
    }
  },
  async deleteGroup(id: string) {
    const user = await this.getGroupById(id);
    if (user) {
      await user.remove();
      return user;
    }
  },
  async addUsersToGroup(groupId: string, userIds: string[]) {
    const group = await this.getGroupById(groupId);
    const users = await UserService.getUsersByIds(userIds);
    if (group && users.length) {
      group.users = users;
      await group.save();
      return group;
    }
  },
};
