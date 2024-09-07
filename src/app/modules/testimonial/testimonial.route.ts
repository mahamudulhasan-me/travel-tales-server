import { Router } from "express";
import { TestimonialController } from "./testimonial.controller";

const router = Router();

router.post("/", TestimonialController.createTestimonial);

router.get("/", TestimonialController.getTestimonial);

export const TestimonialRouters = router;
