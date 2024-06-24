import { Model, ObjectId } from "mongoose";

export interface ISlot {
  service: ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: string;
}

export interface ISlotMethod extends Model<ISlot> {
  getSlotById(id: ObjectId): Promise<ISlot>;
}
