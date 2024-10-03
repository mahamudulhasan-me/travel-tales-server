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
  const posts = await PostService.getPosts();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Posts retrieved successfully",
    data: posts,
  });
});

export const PostController = {
  createPost,
  getPosts,
};
