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
export const UserController = {
  getAllUsers,
  updateUser,
  getUser,
};
