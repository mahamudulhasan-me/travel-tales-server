import AppError from "../../errors/AppError";
import PostModel from "../post/post.model";
import { IComment } from "./comment.interface";
import { CommentModel } from "./comment.model";

const createComment = async (payload: IComment) => {
  const postExists = await PostModel.findById(payload.postId);

  if (!postExists) {
    throw new AppError(404, "Post not found");
  }

  const comment = (await CommentModel.create(payload)).populate({
    path: "author",
    select: "-password", // Exclude password
  });
  return comment;
};

const getComments = async (postId: string) => {
  const comments = await CommentModel.find({ postId })
    .populate({
      path: "author",
      select: "-password", // Exclude password
    })
    .sort({ createdAt: -1 });
  return comments;
};

const updateComment = async (commentId: string, content: string) => {
  const comment = await CommentModel.findByIdAndUpdate(
    commentId,
    { content }, // Updating only content
    { new: true } // Return the updated document
  );
  return comment;
};

const deleteComment = async (commentId: string) => {
  const result = await CommentModel.findByIdAndDelete(commentId);
  return result;
};

export const CommentServices = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
