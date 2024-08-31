import { JwtPayload } from "jsonwebtoken";
import { ServiceModel } from "../service/service.model";

import { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import { formattedBookingData } from "../../utils/formattedBookingData";
import { SlotModel } from "../slot/sot.model";
import { UserModel } from "../user/user.model";
import { IBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

const bookingByUser = async (user: JwtPayload) => {
  const isExitUser = await UserModel.findOne({ email: user.email });

  if (!isExitUser) {
    throw new AppError(404, "This user don't exit");
  }

  const bookings = await BookingModel.find({ customer: isExitUser._id })
    .populate({ path: "service" })
    .populate({ path: "slot" })
    .sort({ createdAt: -1 })
    .exec();

  return formattedBookingData(bookings, false);
};

const bookings = async () => {
  const bookings = await BookingModel.find()
    .populate({ path: "service" })
    .populate({ path: "slot" })
    .populate({ path: "customer" })
    .exec();

  return formattedBookingData(bookings);
};

const createBooking = async (payload: IBooking, user: JwtPayload) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const {
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
    } = payload;

    // Fetch service and slot details
    const service = await ServiceModel.findById(payload?.serviceId).session(
      session
    );
    const slot = await SlotModel.findById(payload?.slotId).session(session);

    // Ensure service and slot exist
    if (!service) {
      throw new AppError(404, "Service not found");
    }
    if (!slot) {
      throw new AppError(404, "Slot not found");
    }

    // Find booked user
    const bookedUser = await UserModel.findOne({ email: user.email });

    if (!bookedUser) {
      throw new AppError(404, "User not found");
    }

    // Update slot to booked status
    if (!slot.isBooked) {
      await SlotModel.findByIdAndUpdate(
        slot._id,
        { isBooked: true },
        { session }
      );
    } else {
      throw new AppError(400, "Slot already booked");
    }

    // Create booking
    const bookingData = {
      service: service._id,
      slot: slot._id,
      customer: bookedUser._id,
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
    };

    const createdBooking = await BookingModel.create([bookingData], {
      session,
    });

    await session.commitTransaction();

    // Populate service and slot information
    const populatedBooking = await BookingModel.findById(createdBooking[0]._id)
      .populate("service")
      .populate("slot")
      .populate("customer")
      .exec();

    // Return formatted response
    const formattedData = formattedBookingData(populatedBooking);
    return formattedData;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
export const BookingServices = {
  createBooking,
  bookings,
  bookingByUser,
};
