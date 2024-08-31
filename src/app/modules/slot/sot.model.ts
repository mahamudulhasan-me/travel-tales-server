import { Schema, Types, model } from "mongoose";
import AppError from "../../errors/AppError";
import { ISlot, ISlotMethod } from "./slot.interface";

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
    isBooked: { type: Boolean, required: true, default: false },
    status: { type: String, required: true, default: "available" },
  },
  {
    timestamps: true,
  }
);

slotSchema.statics.getSlotById = async function (id: string) {
  const slot = await SlotModel.findById(id);
  if (!slot) {
    throw new AppError(404, "Slot not found");
  }
  return slot;
};

export const SlotModel = model<ISlot, ISlotMethod>("slot", slotSchema);
