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
    slot: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "slot",
    },

    vehicleType: {
      type: String,
      required: true,
      enum: vehicleTypes,
    },
    vehicleBrand: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    manufacturingYear: { type: Number, required: true },
    registrationPlate: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const BookingModel = model<IBooking>("booking", bookingSchema);
