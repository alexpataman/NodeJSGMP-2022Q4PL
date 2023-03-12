import { Request, Response } from "express";
import { GroupService } from "../../services";
import { Group } from "../../models";
import {
  addUsersToGroupController,
  createGroupController,
  deleteGroupController,
  getAllGroupsController,
  getGroupController,
  updateGroupController,
} from "./group";

const mockedGroupService = jest.mocked(GroupService);
Object.keys(GroupService).forEach((key) => {
  const method = key as keyof typeof mockedGroupService;
  if (typeof mockedGroupService[method] === "function") {
    mockedGroupService[method as keyof typeof mockedGroupService] = jest.fn();
  }
});

describe("groupController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllGroupsController", () => {
    test("Call next if error occurs", async () => {
      const request = {} as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedGroupService.getAllGroups.mockImplementation(() => {
        throw new Error();
      });

      await getAllGroupsController(request, response, next);
      expect(next.mock.calls).toHaveLength(1);
    });

    test("Call send with group data if success", async () => {
      const request = {} as Request;
      const mockedSend = jest.fn().mockReturnThis();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const result = [] as Group[];
      mockedGroupService.getAllGroups.mockResolvedValue(result);

      await getAllGroupsController(request, response, next);
      expect(mockedGroupService.getAllGroups.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(result);
    });
  });

  describe("getGroupController", () => {
    test("Call next if error occurs", async () => {
      const request = { params: { id: "test" } } as unknown as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedGroupService.getGroupById.mockImplementation(() => {
        throw new Error();
      });

      await getGroupController(request, response, next);
      expect(next.mock.calls).toHaveLength(1);
    });

    test("Call status with 404 and send with message not found if user not found", async () => {
      const request = { params: { id: "test" } } as unknown as Request;
      const mockedSend = jest.fn().mockReturnThis();
      const mockedStatus = jest.fn().mockReturnThis();
      const response = {
        send: mockedSend,
        status: mockedStatus,
      } as unknown as Response;
      const next = () => {};
      mockedGroupService.getGroupById.mockResolvedValue(null);

      await getGroupController(request, response, next);
      expect(mockedGroupService.getGroupById.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls[0][0]).toBe(404);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe("Not found");
    });

    test("Call send with group data if success", async () => {
      const request = { params: { id: "test" } } as unknown as Request;
      const mockedSend = jest.fn().mockReturnThis();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const user = { name: "test" } as unknown as Group;
      mockedGroupService.getGroupById.mockResolvedValue(user);

      await getGroupController(request, response, next);
      expect(mockedGroupService.getGroupById.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(user);
    });
  });

  describe("createGroupController", () => {
    test("Call next if error occurs", async () => {
      const request = { body: {} } as unknown as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedGroupService.createGroup.mockImplementation(() => {
        throw new Error();
      });

      await createGroupController(request, response, next);
      expect(next.mock.calls).toHaveLength(1);
    });

    test("Call send with group data if success", async () => {
      const request = { body: {} } as unknown as Request;
      const mockedSend = jest.fn();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const result = {} as Group;
      mockedGroupService.createGroup.mockResolvedValue(result);

      await createGroupController(request, response, next);
      expect(mockedGroupService.createGroup.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(result);
    });
  });
  describe("updateGroupController", () => {
    test("Call next if error occurs", async () => {
      const request = { params: { id: "test id" } } as unknown as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedGroupService.updateGroup.mockImplementation(() => {
        throw new Error();
      });

      await updateGroupController(request, response, next);
      expect(next.mock.calls).toHaveLength(1);
    });

    test("Call status with 404 and send with message not found if user not found", async () => {
      const request = { params: { id: "test" } } as unknown as Request;
      const mockedSend = jest.fn().mockReturnThis();
      const mockedStatus = jest.fn().mockReturnThis();
      const response = {
        send: mockedSend,
        status: mockedStatus,
      } as unknown as Response;
      const next = () => {};
      mockedGroupService.updateGroup.mockResolvedValue(undefined);

      await updateGroupController(request, response, next);
      expect(mockedGroupService.updateGroup.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls[0][0]).toBe(404);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe("Not found");
    });

    test("Call send with group data if success", async () => {
      const request = { params: { id: "test id" } } as unknown as Request;
      const mockedSend = jest.fn();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const result = {} as Group;
      mockedGroupService.updateGroup.mockResolvedValue(result);

      await updateGroupController(request, response, next);
      expect(mockedGroupService.updateGroup.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(result);
    });
  });

  describe("deleteGroupController", () => {
    test("Call next if error occurs", async () => {
      const request = { params: { id: "test id" } } as unknown as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedGroupService.deleteGroup.mockImplementation(() => {
        throw new Error();
      });

      await deleteGroupController(request, response, next);
      expect(next.mock.calls).toHaveLength(1);
    });

    test("Call status with 404 and send with message not found if user not found", async () => {
      const request = { params: { id: "test" } } as unknown as Request;
      const mockedSend = jest.fn().mockReturnThis();
      const mockedStatus = jest.fn().mockReturnThis();
      const response = {
        send: mockedSend,
        status: mockedStatus,
      } as unknown as Response;
      const next = () => {};
      mockedGroupService.deleteGroup.mockResolvedValue(undefined);

      await deleteGroupController(request, response, next);
      expect(mockedGroupService.deleteGroup.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls[0][0]).toBe(404);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe("Not found");
    });

    test("Call send with group data if success", async () => {
      const request = { params: { id: "test id" } } as unknown as Request;
      const mockedSend = jest.fn();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const result = {} as Group;
      mockedGroupService.deleteGroup.mockResolvedValue(result);

      await deleteGroupController(request, response, next);
      expect(mockedGroupService.deleteGroup.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(result);
    });
  });

  describe("addUsersToGroupController", () => {
    test("Call next if error occurs", async () => {
      const request = {
        body: { groupId: "group id", userIds: ["user1", "user2"] },
      } as unknown as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedGroupService.addUsersToGroup.mockImplementation(() => {
        throw new Error();
      });

      await addUsersToGroupController(request, response, next);
      expect(next.mock.calls).toHaveLength(1);
    });

    test("Call status with 404 and send with message not found if user not found", async () => {
      const request = {
        body: { groupId: "group id", userIds: ["user1", "user2"] },
      } as unknown as Request;
      const mockedSend = jest.fn().mockReturnThis();
      const mockedStatus = jest.fn().mockReturnThis();
      const response = {
        send: mockedSend,
        status: mockedStatus,
      } as unknown as Response;
      const next = () => {};
      mockedGroupService.addUsersToGroup.mockResolvedValue(undefined);

      await addUsersToGroupController(request, response, next);
      expect(mockedGroupService.addUsersToGroup.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls[0][0]).toBe(404);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe("Not found");
    });

    test("Call send with group data if success", async () => {
      const request = {
        body: { groupId: "group id", userIds: ["user1", "user2"] },
      } as unknown as Request;
      const mockedSend = jest.fn();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const result = {} as Group;
      mockedGroupService.addUsersToGroup.mockResolvedValue(result);

      await addUsersToGroupController(request, response, next);
      expect(mockedGroupService.addUsersToGroup.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(result);
    });
  });
});
