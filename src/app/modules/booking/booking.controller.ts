import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const createBooking = asyncHandler(async (req, res, next) => {
  const createdBooking = await BookingServices.createBooking(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Booking successful",
    data: createdBooking,
  });
});

export const BookingControllers = {
  createBooking,
};
