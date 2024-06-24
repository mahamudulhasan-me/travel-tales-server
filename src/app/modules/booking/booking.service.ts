import { JwtPayload } from "jsonwebtoken";
import { ServiceModel } from "../service/service.model";

import { startSession } from "mongoose";
import AppError from "../../errors/AppError";
import { SlotModel } from "../slot/sot.model";
import { UserModel } from "../user/user.model"; // Assuming UserModel for customer retrieval
import { IBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

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
    const formattedData = {
      _id: populatedBooking?._id,
      service: {
        _id: populatedBooking?.serviceId?._id,
        name: populatedBooking?.serviceId?.name,
        description: populatedBooking?.serviceId?.description,
        price: populatedBooking?.serviceId?.price,
        duration: populatedBooking?.serviceId?.duration,
        isDeleted: populatedBooking?.serviceId?.isDeleted,
      },
      slot: {
        _id: populatedBooking?.slotId?._id,
        date: populatedBooking?.slotId?.date,
        startTime: populatedBooking?.slotId?.startTime,
        endTime: populatedBooking?.slotId?.endTime,
        isBooked: populatedBooking?.slotId?.isBooked,
      },
      customer: {
        _id: populatedBooking?.customer?._id,
        name: populatedBooking?.customer?.name,
        email: populatedBooking?.customer?.email,
        phone: populatedBooking?.customer?.phone,
        address: populatedBooking?.customer?.address,
      },
      vehicleType,
      vehicleBrand,
      vehicleModel,
      manufacturingYear,
      registrationPlate,
      createdAt: populatedBooking?.createdAt,
      updatedAt: populatedBooking?.updatedAt,
    };
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
};
