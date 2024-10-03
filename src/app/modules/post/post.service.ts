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

// Function to handle voting
const handleVote = async (
  postId: string,
  userId: string,
  voteType: "upvote" | "downvote"
) => {
  // Find the post
  const post = await PostModel.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Check if the user has already voted
  const existingVote = post.votes.find(
    (vote) => vote.user.toString() === userId
  );

  if (existingVote) {
    // If the user already voted, update the vote type
    if (existingVote.voteType === voteType) {
      // If they voted the same way again, remove the vote
      post.votes = post.votes.filter((vote) => vote.user.toString() !== userId);
    } else {
      // If they change their vote, update the vote type
      existingVote.voteType = voteType;
    }
  } else {
    // If the user hasn't voted yet, add a new vote
    post.votes.push({ user: userId, voteType });
  }

  // Save the updated post
  await post.save();

  return post; // Optionally return the updated post
};
export const PostService = {
  createPost,
  getPosts,
};
