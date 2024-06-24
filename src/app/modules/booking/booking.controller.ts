import { JwtPayload } from "jsonwebtoken";
import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const bookingByUser = asyncHandler(async (req, res, next) => {
  const user = req.user as JwtPayload;
  const bookings = await BookingServices.bookingByUser(user);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User bookings retrieved successfully",
    data: bookings,
  });
});

const bookings = asyncHandler(async (req, res, next) => {
  const bookings = await BookingServices.bookings();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All bookings retrieved successfully",
    data: bookings,
  });
});

const createBooking = asyncHandler(async (req, res, next) => {
  const user = req.user as JwtPayload;
  const createdBooking = await BookingServices.createBooking(req.body, user);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking successful",
    data: createdBooking,
  });
});

export const BookingControllers = {
  createBooking,
  bookings,
  bookingByUser,
};
