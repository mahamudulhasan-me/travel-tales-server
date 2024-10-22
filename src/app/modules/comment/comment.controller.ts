import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { CommentServices } from "./comment.service";

const createComment = asyncHandler(async (req, res) => {
  const { postId, content, author } = req.body;
  const comment = await CommentServices.createComment({
    postId,
    content,
    author,
  });
  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Comment created successfully",
    data: comment,
  });
});

const getComments = asyncHandler(async (req, res) => {
  const comments = await CommentServices.getComments(req.params.postId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Comments retrieved successfully",
    data: comments,
  });
});

const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const comment = await CommentServices.updateComment(id, content);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Comment updated successfully",
    data: comment,
  });
});

const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await CommentServices.deleteComment(id);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Comment deleted successfully",
    data: comment,
  });
});

export const CommentController = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
