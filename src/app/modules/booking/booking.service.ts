import { JwtPayload } from "jsonwebtoken";
import { ServiceModel } from "../service/service.model";

import { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import { formattedBookingData } from "../../utils/formattedBookingData";
import { SlotModel } from "../slot/sot.model";
import { UserModel } from "../user/user.model"; // Assuming UserModel for customer retrieval
import { IBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

const bookingByUser = async (user: JwtPayload) => {
  console.log(user);
  const isExitUser = await UserModel.findOne({ email: user.email });

  if (!isExitUser) {
    throw new AppError(404, "This user don't exit");
  }

  const bookings = await BookingModel.find({ customer: isExitUser._id })
    .populate({ path: "serviceId" })
    .populate({ path: "slotId" })
    .exec();

  return formattedBookingData(bookings, false);
};

const bookings = async () => {
  const bookings = await BookingModel.find()
    .populate({ path: "serviceId" })
    .populate({ path: "slotId" })
    .populate({ path: "customer" })
    .exec();

  return formattedBookingData(bookings);
};

const createBooking = async (payload: IBooking, user: JwtPayload) => {
  const session = await startSession();
  session.startTransaction();
  try {
    // Destructure payload
    const {
      serviceId,
      slotId,
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
    } = payload;

    // Fetch service and slot details
    const service = await ServiceModel.findById(serviceId).session(session);
    const slot = await SlotModel.findById(slotId).session(session);

    // Find booked user
    const bookedUser = await UserModel.findOne({ email: user.email });

    if (!bookedUser) {
      throw new Error("User not found");
    }

    // Update slot to booked status
    if (slot?.isBooked === "available") {
      await SlotModel.findByIdAndUpdate(slotId, { isBooked: "booked" }).session(
        session
      );
    } else {
      throw new AppError(400, "Slot already booked");
    }

    // Create booking
    const bookingData = {
      serviceId: service?._id,
      slotId: slot?._id,
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
    const populatedBooking = (await BookingModel.findById(createdBooking[0]._id)
      .populate("serviceId")
      .populate("slotId")
      .populate("customer")
      .exec()) as any;

    // Construct formatted response
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
