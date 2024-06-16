import { Router } from "express";
import auth from "../../middlewares/auth";
import validRequestHandler from "../../middlewares/validRequestHandler";
import { USER_ROLE } from "../../utils/const";
import { ServiceControllers } from "./service.controller";
import { ZodCreateServiceValidationSchema } from "./service.validation";

const router = Router();

router.get("/", ServiceControllers.getServices);
router.get("/:id", ServiceControllers.getServiceById);

router.post(
  "/",
  auth(USER_ROLE.admin),
  validRequestHandler(ZodCreateServiceValidationSchema),
  ServiceControllers.createService
);
router.put("/:id", auth(USER_ROLE.admin), ServiceControllers.updateService);
router.delete("/:id", auth(USER_ROLE.admin), ServiceControllers.deleteService);
export const ServiceRouters = router;
