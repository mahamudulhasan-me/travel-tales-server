import { model, Schema } from "mongoose";
import { ITestimonial } from "./testimonial.interface";

const testimonialSchema = new Schema<ITestimonial>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  description: {
    type: String,
    required: true,
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
