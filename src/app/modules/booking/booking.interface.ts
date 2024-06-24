import { Model, ObjectId } from "mongoose";

export interface IBooking {
  serviceId: ObjectId;
  slotId: ObjectId;
  customer: ObjectId;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}
