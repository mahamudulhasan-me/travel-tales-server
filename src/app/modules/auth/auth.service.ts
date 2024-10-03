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
    throw new AppError(401, "User already exist");
  }

  const result = await UserModel.create(payload);

  const accessToken = createToken(
    payload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in
  );
  const refreshToken = createToken(
    payload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in
  );

  // Omit password from the user object before returning
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: result,
  };
};

const loginUser = async (payload: ILogin) => {
  const { email, password } = payload;

  const user = await UserModel.findOne({ email }).select("+password").exec();

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const isPasswordMatch = await UserModel.isMatchPassword(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new AppError(401, "Invalid password");
  }
  const { password: _, ...userWithoutPassword } = user.toObject() as IUser;
  // generate jwt token

  const accessToken = createToken(
    userWithoutPassword,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in
  );
  const refreshToken = createToken(
    userWithoutPassword,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in
  );

  // Omit password from the user object before returning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
    user: userWithoutPassword,
  };
};

export const AuthServices = {
  signupUser,
  loginUser,
};
