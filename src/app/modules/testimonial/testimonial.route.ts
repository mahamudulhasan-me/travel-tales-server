import { Router } from "express";
import { TestimonialController } from "./testimonial.controller";

const router = Router();

router.post("/", TestimonialController.createTestimonial);

export const TestimonialRouters = router;
