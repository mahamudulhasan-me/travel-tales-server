import { model, Schema } from "mongoose";
import { IPayment } from "./payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    amount: {
      type: Number,
      required: true,
    },
    transactionId: { type: String, required: true },
    cusName: {
      type: String,
      required: true,
    },
    cusEmail: {
      type: String,
      required: true,
    },
    cusPhone: {
      type: String,
      required: true,
    },
    cusAddress: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PaymentModel = model("payment", paymentSchema);
