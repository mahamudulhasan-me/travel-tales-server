import { Model, ObjectId } from "mongoose";

export interface IBooking {
  serviceId: ObjectId;
  slotId: ObjectId;
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: number;
  registrationPlate: string;
}
