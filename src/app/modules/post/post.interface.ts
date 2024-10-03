import { Document } from "mongoose";
export interface IPost extends Document {
  author: string;
  content: string;
  upVote: number;
  downVote: number;
  images: string[];
  isPremium: boolean;
}
