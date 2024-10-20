import mongoose, { Schema } from "mongoose";
import { IPost } from "./post.interface";

const PostSchema: Schema = new Schema<IPost>(
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

    category: {
      type: String,
      required: true,
    },

    votes: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        voteType: {
          type: String,
          enum: ["upvote", "downvote"],
          required: true,
        },
        postId: {
          type: Schema.Types.ObjectId,
          ref: "post",
          required: true,
        },
      },
    ],

    images: {
      type: [String], // Array of image URLs
      default: [],
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    voteCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const PostModel = mongoose.model<IPost>("post", PostSchema);

export default PostModel;
