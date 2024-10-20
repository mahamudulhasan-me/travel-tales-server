import { Router } from "express";
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

export const UserRouters = router;
