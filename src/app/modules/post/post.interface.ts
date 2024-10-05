import { Document, ObjectId } from "mongoose";

export interface IPost extends Document {
  author: ObjectId;
  content: string;
  votes: {
    userId: string;
    postId: string;
    voteType: "upvote" | "downvote";
  }[];
  images: string[];
  isPremium: boolean;
  voteCount: number; // Added vote count to track total votes
}
