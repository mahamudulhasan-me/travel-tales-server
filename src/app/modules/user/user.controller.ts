import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Users retrieved successfully",
    data: users,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = req.body;
  const updatedUser = await UserService.updateUser(id, data);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User updated successfully",
    data: updatedUser,
  });
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await UserService.getUser(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User retrieved successfully",
    data: user,
  });
});

const handleFollow = asyncHandler(async (req, res) => {
  const { userId, followerId } = req.body;
  const user = await UserService.followUser(userId, followerId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User followed successfully",
    data: user,
  });
});

const handleUnfollow = asyncHandler(async (req, res) => {
  const { userId, followerId } = req.body;
  const user = await UserService.unfollowUser(userId, followerId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User unfollowed successfully",
    data: user,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await UserService.deleteUser(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User deleted successfully",
    data: user,
  });
});

const changeUserRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;

  const user = await UserService.changeUserRole(userId, role);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User role changed successfully",
    data: user,
  });
});

export const UserController = {
  getAllUsers,
  updateUser,
  getUser,
  handleFollow,
  handleUnfollow,
  deleteUser,
  changeUserRole,
};
