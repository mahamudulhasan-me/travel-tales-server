import { ObjectId } from "mongoose";

export interface IBooking {
  service: ObjectId;
  slot: ObjectId;
  customer: ObjectId;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}
