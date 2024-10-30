import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { IUser, IUserMethod } from "./user.interface";
const generateRandomPhone = () => {
  return `+1${Date.now()}${Math.floor(Math.random() * 1000)}`; // Random US phone number format for example
};
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // Use select: false
    role: { type: String, enum: ["admin", "user"], required: true },
    status: {
      type: String,
      enum: ["Basic", "Premium"],
      default: "Basic",
      required: true,
    },
    phone: { type: String, default: generateRandomPhone() },
    address: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    dateOfBirth: { type: Date, default: "" },
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

userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(Number(config.bcrypt_salt_rounds));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Remove the password from the output in responses
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export const UserModel = model<IUser, IUserMethod>("user", userSchema);
