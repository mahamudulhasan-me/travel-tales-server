import { Router } from "express";
import { CommentController } from "./comment.controller";

const router = Router();

router.post("/", CommentController.createComment);

router.get("/:postId", CommentController.getComments);

router.patch("/:id", CommentController.updateComment);

router.delete("/:id", CommentController.deleteComment);

export const CommentRouters = router;
