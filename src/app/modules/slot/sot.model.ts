import { Schema, Types, model } from "mongoose";
import { ISlot } from "./slot.interface";

const slotSchema = new Schema<ISlot>(
  {
    service: {
      type: Types.ObjectId,
      required: true,
      ref: "service",
    },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    isBooked: { type: String, required: true, default: "available" },
  },
  {
    timestamps: true,
  }
);

export const SlotModel = model<ISlot>("slot", slotSchema);
