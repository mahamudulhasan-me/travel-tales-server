/* eslint-disable no-unused-vars */
import config from "../../config";
import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { ILogin } from "./auth.interface";
import { createToken } from "./auth.utils";

const signupUser = async (payload: IUser) => {
  const { email } = payload;

  const user = await UserModel.isUserExist(email);

  if (user) {
    throw new AppError(401, "User already exists");
  }

  const result = await UserModel.create(payload);

  // Convert result to plain object
  const plainUser = result.toObject();

  const accessToken = createToken(
    plainUser, // Use plainUser here
    config.jwt_access_secret as string,
    config.jwt_access_expires_in
  );
  const refreshToken = createToken(
    plainUser, // Use plainUser here
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in
  );

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: plainUser, // Return plainUser if needed
  };
};

const loginUser = async (payload: ILogin) => {
  const { email, password } = payload;

  // Find the user by email and include the password field
  const user = await UserModel.findOne({ email }).select("+password").exec();

  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Check if the password matches
  const isPasswordMatch = await UserModel.isMatchPassword(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new AppError(401, "Invalid password");
  }

  // Extract the _id and remove the password field
  const { _id, password: _, ...userWithoutPassword } = user.toObject();

  // Pass _id as a string explicitly to the token payload
  const accessToken = createToken(
    { _id: _id.toString(), ...userWithoutPassword }, // Include _id as a string
    config.jwt_access_secret as string,
    config.jwt_access_expires_in
  );

  const refreshToken = createToken(
    { _id: _id.toString(), ...userWithoutPassword }, // Same for refresh token
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in
  );

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: { _id: _id.toString(), ...userWithoutPassword }, // Return _id as a string in the response
  };
};

export const AuthServices = {
  signupUser,
  loginUser,
};
