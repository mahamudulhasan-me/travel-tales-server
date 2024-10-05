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

const getPosts = async () => {
  const posts = await PostModel.find()
    .populate("author")
    .sort({ createdAt: -1 });
  return posts;
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

export const PostService = {
  createPost,
  getPosts,
  handleVote,
};
