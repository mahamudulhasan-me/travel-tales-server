import { ObjectId } from "mongoose";

export interface ITestimonial {
  user: ObjectId;
  description: string;
  rating: number;
  isDeleted: boolean;
}
