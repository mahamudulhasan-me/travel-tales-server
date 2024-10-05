import { Router } from "express";
import { PostController } from "./post.controller";

const router = Router();

router.post("/", PostController.createPost);

router.get("/", PostController.getPosts);

router.post("/vote", PostController.handleVote);

export const PostRouters = router;
