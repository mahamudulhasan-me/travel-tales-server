/* eslint-disable @typescript-eslint/no-explicit-any */
import { isValidObjectId, SortOrder } from "mongoose"; // Import the SortOrder type
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { IPost } from "./post.interface";
import PostModel from "./post.model";

const createPost = async (payload: IPost) => {
  // Create the post and populate the author while excluding the password
  const post = await PostModel.create(payload);
  const populatedPost = await post.populate({
    path: "author",
    select: "-password", // Exclude password
  });

  return populatedPost;
};

const getPosts = async (
  userId: string, // Assuming you're passing the user ID to check their status
  limit: number = 5,
  filterBy: "default" | string = "default",
  sortBy: "default" | "upVote" | "downVote" = "default",
  searchValue?: string
): Promise<{ totalPosts: number; posts: IPost[] }> => {
  // Check if userId is provided and valid
  if (!userId || !isValidObjectId(userId)) {
    throw new AppError(401, "This route is not for you.");
  }

  // First, get the user's status based on their ID
  const user = await UserModel.findById(userId).select("status");

  // Check if user is found
  if (!user) {
    throw new AppError(401, "This route is not for you.");
  }

  // Build filter and sort conditions
  const filterOptions: { [key: string]: any } = {};

  // If searchValue is provided, prioritize search over other filters
  if (searchValue) {
    const searchRegex = new RegExp(searchValue, "i"); // "i" for case-insensitive search
    filterOptions.$or = [
      { content: { $regex: searchRegex } }, // Search in content
      { "author.name": { $regex: searchRegex } }, // Search in author name (if author is populated)
    ];
  } else {
    // Apply category filtering only if filterBy is not "default" and no searchValue
    if (filterBy && filterBy !== "default") {
      filterOptions.category = filterBy;
    }
  }

  // If the user is not "Premium", exclude premium posts
  if (user?.status !== "Premium") {
    filterOptions.isPremium = false; // Non-premium users can only see non-premium posts
  }

  // Build sort condition
  const sortOptions: { [key: string]: SortOrder } = {}; // Use SortOrder type

  if (!searchValue) {
    // Only apply sorting if no search is happening
    if (!sortBy || sortBy === "default") {
      sortOptions.createdAt = -1; // Default: Sort by latest date (descending)
    } else if (sortBy === "upVote") {
      sortOptions.voteCount = -1; // Sort by most votes (descending)
    } else if (sortBy === "downVote") {
      sortOptions.voteCount = 1; // Sort by least votes (ascending)
    }
  }

  // Get the total count of posts based on the filter options
  const totalPosts = await PostModel.countDocuments(filterOptions);

  // Fetch the posts with the appropriate filters and sorting
  const posts = await PostModel.find(filterOptions)
    .sort(sortOptions) // Use properly typed sortOptions
    .limit(limit)
    .populate({ path: "author", select: "-password" }); // Populate the author field, excluding the password

  return { totalPosts, posts };
};

const handleVote = async (
  postId: string,
  userId: string,
  voteType: "upvote" | "downvote"
) => {
  // Find the post by its ID
  const post = await PostModel.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Check if the user has already voted
  const existingVote = post.votes.find(
    (vote) => vote.userId.toString() === userId
  );

  if (existingVote) {
    // If the user has already voted, check if they are voting the same way again
    if (existingVote.voteType === voteType) {
      // If the vote type is the same, remove the vote
      post.votes = post.votes.filter(
        (vote) => vote.userId.toString() !== userId
      );

      // Adjust the vote count (ensure it doesn't go negative)
      if (voteType === "upvote") {
        post.voteCount = Math.max(post.voteCount - 1, 0); // Prevent negative count
      } else if (voteType === "downvote") {
        post.voteCount = Math.max(post.voteCount + 1, 0); // Adjust for the previous downvote
      }
    } else {
      // If the user changes their vote (upvote -> downvote or vice versa)
      if (existingVote.voteType === "upvote") {
        post.voteCount = Math.max(post.voteCount - 1, 0); // Revert the previous upvote
      } else if (existingVote.voteType === "downvote") {
        post.voteCount = Math.max(post.voteCount + 1, 0); // Revert the previous downvote
      }

      // Update the vote type to the new one
      existingVote.voteType = voteType;

      // Adjust the vote count based on the new vote type
      if (voteType === "upvote") {
        post.voteCount += 1;
      } else if (voteType === "downvote") {
        post.voteCount = Math.max(post.voteCount - 1, 0); // Prevent negative count
      }
    }
  } else {
    // If the user hasn't voted yet, add a new vote
    post.votes.push({ userId, voteType, postId });

    // Increment or decrement the vote count based on the vote type
    if (voteType === "upvote") {
      post.voteCount += 1;
    } else if (voteType === "downvote") {
      post.voteCount = Math.max(post.voteCount - 1, 0); // Prevent negative count
    }
  }

  // Save the updated post with the new vote count
  await post.save();

  return post; // Optionally return the updated post
};

const getPostByUserId = async (userId: string) => {
  const post = await PostModel.find({ author: userId })
    .populate({
      path: "author",
      select: "-password",
    })
    .sort({ createdAt: -1 });
  return post;
};

const updatePost = async (postId: string, payload: IPost) => {
  const post = await PostModel.findOneAndUpdate({ _id: postId }, payload, {
    new: true,
  });
  return post;
};

const deletePost = async (postId: string) => {
  const post = await PostModel.findByIdAndDelete(postId);
  return post;
};

export const PostService = {
  createPost,
  getPosts,
  handleVote,
  getPostByUserId,
  updatePost,
  deletePost,
};
