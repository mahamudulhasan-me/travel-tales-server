import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { ILogin } from "./auth.interface";

const signupUser = async (payload: IUser) => {
  const { email, role } = payload;

  const user = await UserModel.isUserExist(email);

  if (user) {
    throw new AppError(401, "User already exist");
  }

  const result = await UserModel.create(payload);

  return result;
};

const loginUser = async (payload: ILogin) => {
  const { email, password } = payload;

  const user = await UserModel.isUserExist(email);

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
  };
  const jwtToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "1d",
  });

  return { token: jwtToken, user };
};

export const AuthServices = {
  signupUser,
  loginUser,
};
