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

export const TestimonialController = {
  createTestimonial,
};
