import { Document, ObjectId } from "mongoose";

// Interface for Payment
export interface IPayment extends Document {
  userId: ObjectId;
  transactionId: string;
  paymentStatus: "pending" | "paid";
  amount: number;
  cusName: string;
  cusEmail: string;
  cusPhone: string;
  cusAddress: string;
}
