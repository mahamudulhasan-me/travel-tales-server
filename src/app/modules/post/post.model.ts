import mongoose, { Schema } from "mongoose";
import { IPost } from "./post.interface";

const PostSchema: Schema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user", // Assuming "User" is the related model for the author
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    upVote: {
      type: Number,
      default: 0,
    },
    downVote: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String], // Array of image URLs
      default: [],
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const PostModel = mongoose.model<IPost>("Post", PostSchema);

export default PostModel;
