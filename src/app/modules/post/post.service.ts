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
  limit: number,
  filterBy: "default" | string,
  sortBy: "default" | "upVote" | "downVote"
): Promise<{ totalPosts: number; posts: IPost[] }> => {
  // Build filter and sort conditions
  const filterOptions: { [key: string]: string } = {};

  // Apply category filtering only if filterBy is not "default"
  if (filterBy && filterBy !== "default") {
    filterOptions.category = filterBy;
  }

  // Build sort condition
  const sortOptions: { [key: string]: number } = {};

  // Sorting based on the selected sorting option
  if (!sortBy || sortBy === "default") {
    sortOptions.createdAt = -1; // Default: Sort by latest date (descending)
  } else if (sortBy === "upVote") {
    sortOptions.voteCount = -1; // Sort by most votes (descending)
  } else if (sortBy === "downVote") {
    sortOptions.voteCount = 1; // Sort by least votes (ascending)
  }

  const totalPosts = await PostModel.countDocuments(filterOptions); // Get total post count
  const posts = await PostModel.find(filterOptions)
    .sort(sortOptions)
    .limit(limit || 5)
    .populate({ path: "author", select: "-password" }); // Limit the number of posts (default: 5)

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
export const PostService = {
  createPost,
  getPosts,
  handleVote,
  getPostByUserId,
};
