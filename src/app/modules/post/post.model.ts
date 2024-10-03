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

    votes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        voteType: {
          type: String,
          enum: ["upvote", "downvote"],
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
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const PostModel = mongoose.model<IPost>("Post", PostSchema);

export default PostModel;
