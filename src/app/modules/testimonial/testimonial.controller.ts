import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { TestimonialService } from "./testimonial.service";

const createTestimonial = asyncHandler(async (req, res) => {
  const data = req.body;
  const testimonial = await TestimonialService.createTestimonial(data);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Testimonial created successfully",
    data: testimonial,
  });
});

const getTestimonial = asyncHandler(async (req, res) => {
  const testimonials = await TestimonialService.getTestimonial();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Testimonial retrieved successfully",
    data: testimonials,
  });
});

export const TestimonialController = {
  createTestimonial,
  getTestimonial,
};
