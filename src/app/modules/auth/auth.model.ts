import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { ISignup, IUserMethod } from "./auth.interface";

const userSchema = new Schema<ISignup>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, project: false },
    phone: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], required: true },
    address: { type: String, required: true },
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

userSchema.pre("save", async function (next) {
  const user = this;
  this.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
});

export const UserModel = model<ISignup, IUserMethod>("user", userSchema);
