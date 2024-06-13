import { Router } from "express";
import auth from "../../middlewares/auth";
import validRequestHandler from "../../middlewares/validRequestHandler";
import { USER_ROLE } from "../../utils/const";
import { ServiceControllers } from "./service.controller";
import { ZodCreateServiceValidationSchema } from "./service.validation";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validRequestHandler(ZodCreateServiceValidationSchema),
  ServiceControllers.createService
);

export const ServiceRouters = router;
