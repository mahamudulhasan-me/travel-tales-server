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
    phone: { type: String },
    address: { type: String },
    profileImage: { type: String },
    coverImage: { type: String },
    dateOfBirth: { type: Date },
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
