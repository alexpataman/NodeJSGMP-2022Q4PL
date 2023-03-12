import {
  userLoginController,
  getAllUsersController,
  getUserController,
  searchUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "./user";
import { Request, Response } from "express";
import { UserService } from "../../services";
import { User } from "../../models";

const mockedUserService = jest.mocked(UserService);
Object.keys(UserService).forEach((key) => {
  const method = key as keyof typeof mockedUserService;
  if (typeof mockedUserService[method] === "function") {
    mockedUserService[method as keyof typeof mockedUserService] = jest.fn();
  }
});

describe("userController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("userLoginController", () => {
    test("Call next if error occurs", async () => {
      const request = {
        body: {
          login: "test",
          password: "pass",
        },
      } as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedUserService.login.mockImplementation(() => {
        throw new Error();
      });

      await userLoginController(request, response, next);
      expect(next.mock.calls).toHaveLength(1);
    });

    test("Call send with token if successful login", async () => {
      const request = {
        body: {
          login: "test",
          password: "pass",
        },
      } as Request;
      const mockedSend = jest.fn();
      const response = { send: mockedSend } as unknown as Response;
      const next = () => {};
      mockedUserService.login.mockResolvedValue("token data");

      await userLoginController(request, response, next);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe("token data");
    });

    test("Call status with 403 and send with message forbidden if failed login", async () => {
      const request = {
        body: {
          login: "test",
          password: "pass",
        },
      } as Request;
      const mockedSend = jest.fn().mockReturnThis();
      const mockedStatus = jest.fn().mockReturnThis();
      const response = {
        status: mockedStatus,
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      mockedUserService.login.mockResolvedValue("");

      await userLoginController(request, response, next);
      expect(mockedStatus.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls[0][0]).toBe(403);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe("Forbidden");
    });
  });

  describe("getAllUsersController", () => {
    test("Call next if error occurs", async () => {
      const request = {} as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedUserService.getAllUsers.mockImplementation(() => {
        throw new Error();
      });

      await getAllUsersController(request, response, next);
      expect(next.mock.calls).toHaveLength(1);
    });

    test("Call send with user data if success", async () => {
      const request = {} as Request;
      const mockedSend = jest.fn().mockReturnThis();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const result = [] as User[];
      mockedUserService.getAllUsers.mockResolvedValue(result);

      await getAllUsersController(request, response, next);
      expect(mockedUserService.getAllUsers.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(result);
    });
  });

  describe("getUserController", () => {
    test("Call next if error occurs", async () => {
      const request = { params: { id: "test" } } as unknown as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedUserService.getUserById.mockImplementation(() => {
        throw new Error();
      });

      await getUserController(request, response, next);
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
      mockedUserService.getUserById.mockResolvedValue(null);

      await getUserController(request, response, next);
      expect(mockedUserService.getUserById.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls[0][0]).toBe(404);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe("Not found");
    });

    test("Call send with user data if success", async () => {
      const request = { params: { id: "test" } } as unknown as Request;
      const mockedSend = jest.fn().mockReturnThis();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const user = { name: "test" } as unknown as User;
      mockedUserService.getUserById.mockResolvedValue(user);

      await getUserController(request, response, next);
      expect(mockedUserService.getUserById.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(user);
    });
  });

  describe("searchUserController", () => {
    test("Call next if error occurs", async () => {
      const request = { query: {} } as unknown as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedUserService.getAutoSuggestUsers.mockImplementation(() => {
        throw new Error();
      });

      await searchUserController(request, response, next);
      expect(next.mock.calls).toHaveLength(1);
    });

    test("Call send with user data if success", async () => {
      const request = { query: {} } as unknown as Request;
      const mockedSend = jest.fn();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const result = [] as User[];
      mockedUserService.getAutoSuggestUsers.mockResolvedValue(result);

      await searchUserController(request, response, next);
      expect(mockedUserService.getAutoSuggestUsers.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(result);
    });
  });

  describe("createUserController", () => {
    test("Call next if error occurs", async () => {
      const request = { body: {} } as unknown as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedUserService.createUser.mockImplementation(() => {
        throw new Error();
      });

      await createUserController(request, response, next);
      expect(next.mock.calls).toHaveLength(1);
    });

    test("Call send with user data if success", async () => {
      const request = { body: {} } as unknown as Request;
      const mockedSend = jest.fn();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const result = {} as User;
      mockedUserService.createUser.mockResolvedValue(result);

      await createUserController(request, response, next);
      expect(mockedUserService.createUser.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(result);
    });
  });
  describe("updateUserController", () => {
    test("Call next if error occurs", async () => {
      const request = { params: { id: "test id" } } as unknown as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedUserService.updateUser.mockImplementation(() => {
        throw new Error();
      });

      await updateUserController(request, response, next);
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
      mockedUserService.updateUser.mockResolvedValue(undefined);

      await updateUserController(request, response, next);
      expect(mockedUserService.updateUser.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls[0][0]).toBe(404);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe("Not found");
    });

    test("Call send with user data if success", async () => {
      const request = { params: { id: "test id" } } as unknown as Request;
      const mockedSend = jest.fn();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const result = {} as User;
      mockedUserService.updateUser.mockResolvedValue(result);

      await updateUserController(request, response, next);
      expect(mockedUserService.updateUser.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(result);
    });
  });

  describe("deleteUserController", () => {
    test("Call next if error occurs", async () => {
      const request = { params: { id: "test id" } } as unknown as Request;
      const response = {} as unknown as Response;
      const next = jest.fn();
      mockedUserService.deleteUser.mockImplementation(() => {
        throw new Error();
      });

      await deleteUserController(request, response, next);
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
      mockedUserService.deleteUser.mockResolvedValue(undefined);

      await deleteUserController(request, response, next);
      expect(mockedUserService.deleteUser.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls).toHaveLength(1);
      expect(mockedStatus.mock.calls[0][0]).toBe(404);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe("Not found");
    });

    test("Call send with user data if success", async () => {
      const request = { params: { id: "test id" } } as unknown as Request;
      const mockedSend = jest.fn();
      const response = {
        send: mockedSend,
      } as unknown as Response;
      const next = () => {};
      const result = {} as User;
      mockedUserService.deleteUser.mockResolvedValue(result);

      await deleteUserController(request, response, next);
      expect(mockedUserService.deleteUser.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls).toHaveLength(1);
      expect(mockedSend.mock.calls[0][0]).toBe(result);
    });
  });
});
