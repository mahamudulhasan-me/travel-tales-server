import { ITestimonial } from "./testimonial.interface";
import { TestimonialModel } from "./testimonial.model";

const createTestimonial = async (data: ITestimonial) => {
  const testimonial = await TestimonialModel.create(data);
  return testimonial;
};

const getTestimonial = async () => {
  const testimonials = await TestimonialModel.find({
    isDeleted: false,
  }).populate({
    path: "user",
  });
  return testimonials;
};

export const TestimonialService = {
  createTestimonial,
  getTestimonial,
};
