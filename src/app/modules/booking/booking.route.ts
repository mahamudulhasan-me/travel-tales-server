import { Router } from "express";
import auth from "../../middlewares/auth";
import validRequestHandler from "../../middlewares/validRequestHandler";
import { USER_ROLE } from "../../utils/const";
import { BookingControllers } from "./booking.controller";
import { ZodCreateBookingSchema } from "./booking.validation";

const router = Router();

router.get(
  "/my-bookings",
  auth(USER_ROLE.user),
  BookingControllers.bookingByUser
);
router.get("/", auth(USER_ROLE.admin), BookingControllers.bookings);

router.post(
  "/",
  auth(USER_ROLE.user),
  validRequestHandler(ZodCreateBookingSchema),
  BookingControllers.createBooking
);

export const BookingRouters = router;
