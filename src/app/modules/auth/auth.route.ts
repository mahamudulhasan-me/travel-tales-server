import { Router } from "express";
import validRequestHandler from "../../middlewares/validRequestHandler";
import { AuthControllers } from "./auth.controller";
import { ZodSignupValidationSchema } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  validRequestHandler(ZodSignupValidationSchema),
  AuthControllers.signupUser
);

export const AuthRouters = router;
