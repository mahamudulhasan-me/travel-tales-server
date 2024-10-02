/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import config from "../../config";
import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const signupUser = asyncHandler(async (req, res, next) => {
  const { accessToken, refreshToken, user } = await AuthServices.signupUser(
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User registered successfully",
    accessToken,
    refreshToken,
    data: user,
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { accessToken, refreshToken, user } = await AuthServices.loginUser(
    req.body
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_env === "production",
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    accessToken,
    refreshToken,
    data: user,
  });
});

export const AuthControllers = {
  signupUser,
  loginUser,
};
