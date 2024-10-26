import { Router } from "express";
import { PostController } from "./post.controller";

const router = Router();

router.post("/", PostController.createPost);

router.get("/", PostController.getPosts);

router.post("/vote", PostController.handleVote);

router.get(
  "/postByUser/:userId",

  PostController.getPostByUserId
);

router.patch("/:postId", PostController.updatePost);

// router.get("/search-posts", PostController.searchPosts);

export const PostRouters = router;
