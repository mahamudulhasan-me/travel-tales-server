/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, Types } from "mongoose";
import { UserModel } from "./user.model";
const getAllUsers = async () => {
  const users = await UserModel.find();
  return users;
};
const updateUser = async (id: string, data: any) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedUser;
};
const getUser = async (id: string) => {
  const user = await UserModel.findById(id)
    .populate({
      path: "followers",
      select: "name profileImage status _id",
    })
    .populate({
      path: "following",
      select: "name profileImage status _id",
    });

  return user;
};

// Follow a user
const followUser = async (followerId: string, userId: string) => {
  // Convert string IDs to ObjectId
  const userToFollowId = new Types.ObjectId(userId);
  const currentUserId = new Types.ObjectId(followerId);

  // Find the users by their IDs
  const userToFollow = await UserModel.findById(userToFollowId); // The user to be followed
  const currentUser = await UserModel.findById(currentUserId); // The user who is following

  if (!userToFollow || !currentUser) {
    throw new Error("User not found");
  }

  // Ensure that `following` is an array of `Types.ObjectId`
  const followingIds = currentUser.following.map(
    (id: any) => new Types.ObjectId(id)
  );

  // Check if already following using `.some()` and `.equals()`
  if (!followingIds.some((id: Types.ObjectId) => id.equals(userToFollowId))) {
    // Add to following and followers lists, cast to `Schema.Types.ObjectId`
    currentUser.following.push(
      userToFollowId as unknown as Schema.Types.ObjectId
    ); // Add to currentUser's following list
    userToFollow.followers.push(
      currentUserId as unknown as Schema.Types.ObjectId
    ); // Add to userToFollow's followers list

    // Save the changes for both users
    await currentUser.save(); // Save currentUser changes
    await userToFollow.save(); // Save userToFollow changes

    // Return updated user data
    return {
      following: await UserModel.findById(currentUserId)
        .select("following")
        .lean(), // Return only following
      followers: await UserModel.findById(userToFollowId)
        .select("followers")
        .lean(), // Return only followers
    };
  } else {
    throw new Error("You are already following this user");
  }
};

// Unfollow a user
const unfollowUser = async (followerId: string, userId: string) => {
  // Convert string IDs to ObjectId
  const userToUnfollowId = new Types.ObjectId(userId);
  const currentUserId = new Types.ObjectId(followerId);

  // Find the users by their IDs
  const userToUnfollow = await UserModel.findById(userToUnfollowId); // The user to unfollow
  const currentUser = await UserModel.findById(currentUserId); // The user who is unfollowing

  if (!userToUnfollow || !currentUser) {
    throw new Error("User not found");
  }

  // Check if following
  if (currentUser.following.some((id: any) => id.equals(userToUnfollowId))) {
    // Remove from following and followers lists
    currentUser.following = currentUser.following.filter(
      (id: any) => !id.equals(userToUnfollowId)
    ); // Remove from currentUser's following list

    userToUnfollow.followers = userToUnfollow.followers.filter(
      (id: any) => !id.equals(currentUserId)
    ); // Remove from userToUnfollow's followers list

    // Save the changes for both users
    await currentUser.save(); // Save currentUser changes
    await userToUnfollow.save(); // Save userToUnfollow changes

    // Return updated user data
    return {
      following: await UserModel.findById(currentUserId)
        .select("following")
        .lean(), // Return only following
      followers: await UserModel.findById(userToUnfollowId)
        .select("followers")
        .lean(), // Return only followers
    };
  } else {
    throw new Error("You are not following this user");
  }
};

const deleteUser = async (userId: string) => {
  const user = UserModel.findByIdAndDelete(userId);
  return user;
};

const changeUserRole = async (userId: string, role: string) => {
  const user = UserModel.findByIdAndUpdate(userId, { role }, { new: true });
  return user;
};

export const UserService = {
  getAllUsers,
  updateUser,
  getUser,
  followUser,
  unfollowUser,
  deleteUser,
  changeUserRole,
};
