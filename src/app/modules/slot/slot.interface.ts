/* eslint-disable no-unused-vars */
import { Model, ObjectId } from "mongoose";

export interface ISlot {
  _id?: ObjectId;
  service: ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  status: string;
}

export interface ISlotMethod extends Model<ISlot> {
  getSlotById(id: ObjectId): Promise<ISlot>;
}
