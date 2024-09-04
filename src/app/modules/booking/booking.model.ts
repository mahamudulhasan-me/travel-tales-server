import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";
export const vehicleTypes = [
  "car",
  "truck",
  "SUV",
  "van",
  "motorcycle",
  "bus",
  "electricVehicle",
  "hybridVehicle",
  "bicycle",
  "tractor",
];

const bookingSchema = new Schema<IBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "service",
    },
    transactionId: { type: String, required: true },
    slot: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "slot",
    },
    paymentStatus: { type: String, default: "pending" },
    vehicleType: {
      type: String,
    },
    vehicleBrand: { type: String },
    vehicleModel: { type: String },
    manufacturingYear: { type: Number },
    registrationPlate: { type: String },
  },
  {
    timestamps: true,
  }
);

export const BookingModel = model<IBooking>("booking", bookingSchema);
