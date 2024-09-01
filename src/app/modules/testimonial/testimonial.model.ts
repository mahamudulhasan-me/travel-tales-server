import { model, Schema } from "mongoose";
import { ITestimonial } from "./testimonial.interface";

const testimonialSchema = new Schema<ITestimonial>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const TestimonialModel = model<ITestimonial>(
  "testimonial",
  testimonialSchema
);
