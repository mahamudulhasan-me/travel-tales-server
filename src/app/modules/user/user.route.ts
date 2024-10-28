import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", UserController.getAllUsers);
router.patch(
  "/:id",

  UserController.updateUser
);

router.get("/:id", UserController.getUser);

router.post("/follow", UserController.handleFollow);
router.post("/unfollow", UserController.handleUnfollow);
router.delete("/:id", auth("admin"), UserController.deleteUser);

router.post("/change-role", auth("admin"), UserController.changeUserRole);

export const UserRouters = router;
