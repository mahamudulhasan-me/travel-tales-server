import { Router } from "express";
import validRequestHandler from "../../middlewares/validRequestHandler";
import { AuthControllers } from "./auth.controller";
import {
  ZodLoginValidationSchema,
  ZodSignupValidationSchema,
} from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  validRequestHandler(ZodSignupValidationSchema),
  AuthControllers.signupUser
);

router.post(
  "/login",
  validRequestHandler(ZodLoginValidationSchema),
  AuthControllers.loginUser
);

router.post("/forget-password", AuthControllers.handleForgetPassword);

export const AuthRouters = router;
