/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from "mongoose";

export type TPaymentStatus = "pending" | "success" | "failed";

export interface IBooking {
  [x: string]: any;
  _id?: ObjectId;
  service: ObjectId;
  slot: ObjectId;
  customer: ObjectId;
  transactionId: string;
  paymentStatus: TPaymentStatus;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}
