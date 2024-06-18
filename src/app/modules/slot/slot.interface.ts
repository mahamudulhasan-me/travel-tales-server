import { ObjectId } from "mongoose";

export interface ISlot {
  service: ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: string;
}
