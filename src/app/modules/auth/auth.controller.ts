import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const signupUser = asyncHandler(async (req, res, next) => {
  const result = await AuthServices.signupUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { token, user } = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User logged in successfully",
    token,
    data: user,
  });
});

export const AuthControllers = {
  signupUser,
  loginUser,
};
