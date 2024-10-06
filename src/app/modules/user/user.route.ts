import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../../utils/const";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", auth(USER_ROLE.admin), UserController.getAllUsers);
router.patch(
  "/:id",

  UserController.updateUser
);

router.get("/:id", UserController.getUser);

export const UserRouters = router;
