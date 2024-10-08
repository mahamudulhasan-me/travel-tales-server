/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from "mongoose";
import { paymentInitializer } from "../payment/payment.utils";
import { UserModel } from "./user.model";
import PostModel from "../post/post.model";

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
const getUser = async (id: string) => {
  const user = await UserModel.findById(id);
  return user;
};

export const UserService = {
  getAllUsers,
  updateUser,
  getUser,
};
