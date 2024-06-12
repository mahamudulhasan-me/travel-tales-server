import { Schema } from "mongoose";
import { ISignup } from "./auth.interface";

const signUpSchema = new Schema<ISignup>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, project: false },
  phone: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], required: true },
  address: { type: String, required: true },
});
