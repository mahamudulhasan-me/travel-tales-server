import { Router } from "express";
import { AuthRouters } from "../modules/auth/auth.route";
import { BookingRouters } from "../modules/booking/booking.route";
import { ServiceRouters } from "../modules/service/service.route";
import { SlotRouters } from "../modules/slot/slot.route";
import { TestimonialRouters } from "../modules/testimonial/testimonial.route";
import { UserRouters } from "../modules/user/user.route";

const router = Router();
const moduleRouters = [
  {
    path: "/auth",
    route: AuthRouters,
  },
  {
    path: "/services",
    route: ServiceRouters,
  },
  {
    path: "/slots",
    route: SlotRouters,
  },
  {
    path: "/bookings",
    route: BookingRouters,
  },
  {
    path: "/users",
    route: UserRouters,
  },
  {
    path: "/testimonials",
    route: TestimonialRouters,
  },
];

moduleRouters.forEach((route) => router.use(route.path, route.route));

export default router;
