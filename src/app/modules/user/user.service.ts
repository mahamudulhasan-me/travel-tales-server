/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserModel } from "./user.model";

const getAllUsers = async () => {
  const users = await UserModel.find();
  return users;
};
const updateUser = async (id: string, data: any) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedUser;
};
export const UserService = {
  getAllUsers,
  updateUser,
};
