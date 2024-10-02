/* eslint-disable no-unused-vars */
import config from "../../config";
import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { ILogin } from "./auth.interface";
import { createToken } from "./auth.utils";

const signupUser = async (payload: IUser) => {
  const { email, role, status } = payload;

  const user = await UserModel.isUserExist(email);

  if (user) {
    throw new AppError(401, "User already exist");
  }

  const result = await UserModel.create(payload);

  const accessToken = createToken(
    { email, role, status },
    config.jwt_access_secret as string,
    config.jwt_access_expires_in
  );
  const refreshToken = createToken(
    { email, role, status },
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

  // generate jwt token
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    status: user?.status,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in
  );

  // Omit password from the user object before returning
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user.toObject() as IUser;

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
