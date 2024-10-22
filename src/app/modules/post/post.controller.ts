import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { PostService } from "./post.service";

const createPost = asyncHandler(async (req, res) => {
  const post = await PostService.createPost(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Post created successfully",
    data: post,
  });
});

const getPosts = asyncHandler(async (req, res) => {
  const { limit = 5, filterBy = "default", sortBy = "default" } = req.query;

  const posts = await PostService.getPosts(
    parseInt(limit, 10),
    filterBy as string,
    sortBy as "default" | "upvote" | "downvote"
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Posts retrieved successfully",
    data: posts,
  });
});

const handleVote = asyncHandler(async (req, res) => {
  const { postId, userId, voteType } = req.body;

  const post = await PostService.handleVote(postId, userId, voteType);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Post updated successfully",
    data: post,
  });
});

const getPostByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId as string;

  const post = await PostService.getPostByUserId(userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Post retrieved successfully",
    data: post,
  });
});

export const PostController = {
  createPost,
  getPosts,
  handleVote,
  getPostByUserId,
};
