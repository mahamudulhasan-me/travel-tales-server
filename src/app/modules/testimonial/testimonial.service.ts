import { ITestimonial } from "./testimonial.interface";
import { TestimonialModel } from "./testimonial.model";

const createTestimonial = async (data: ITestimonial) => {
  const testimonial = await TestimonialModel.create(data);
  return testimonial;
};

export const TestimonialService = {
  createTestimonial,
};
