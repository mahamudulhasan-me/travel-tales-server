import { Router } from "express";
import { CommentController } from "./comment.controller";

const router = Router();

router.post("/", CommentController.createComment);

router.get("/:postId", CommentController.getComments);

export const CommentRouters = router;
