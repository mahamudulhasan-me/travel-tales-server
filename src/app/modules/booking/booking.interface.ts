import { ObjectId } from "mongoose";

export interface IBooking {
  [x: string]: any;
  _id?: ObjectId;
  service: ObjectId;
  slot: ObjectId;
  customer: ObjectId;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}
