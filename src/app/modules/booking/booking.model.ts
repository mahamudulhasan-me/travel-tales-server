import { Schema, model } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
  serviceId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "service",
  },
  slotId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "slot",
  },
  vehicleType: { type: String, required: true },
  vehicleBrand: { type: String, required: true },
  vehicleModel: { type: String, required: true },
  manufacturingYear: { type: Number, required: true },
  registrationPlate: { type: String, required: true },
});

export const BookingModel = model<IBooking>("booking", bookingSchema);
