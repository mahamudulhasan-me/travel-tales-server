import { ObjectId } from "mongoose";

export interface IComment {
  postId: ObjectId;
  author: ObjectId;
  content: string;
}
