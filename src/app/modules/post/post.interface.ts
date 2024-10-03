import { Document, ObjectId } from "mongoose";
export interface IPost extends Document {
  author: ObjectId;
  content: string;
  votes: {
    user: string;
    voteType: "upvote" | "downvote";
  }[];
  images: string[];
  isPremium: boolean;
}
