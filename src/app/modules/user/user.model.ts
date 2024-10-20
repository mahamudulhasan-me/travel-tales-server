import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { IUser, IUserMethod } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, project: false },
    role: { type: String, enum: ["admin", "user"], required: true },
    status: {
      type: String,
      enum: ["Basic", "Premium"],
      default: "Basic",
      required: true,
    },
    phone: { type: String, unique: true, default: "" },
    address: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    dateOfBirth: { type: Date, default: Date.now },
    bio: { type: String, default: "" },

    followers: [{ type: Schema.Types.ObjectId, ref: "user" }],
    following: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isUserExist = async function (email: string) {
  return await this.findOne({ email });
};

userSchema.statics.isMatchPassword = async function (
  plainPassword: string,
  hashPassword: string
) {
  return await bcrypt.compare(plainPassword, hashPassword);
};

userSchema.pre("save", async function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  this.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
});

userSchema.post("save", function (userInfo, next) {
  userInfo.password = "";
  next();
});

export const UserModel = model<IUser, IUserMethod>("user", userSchema);
