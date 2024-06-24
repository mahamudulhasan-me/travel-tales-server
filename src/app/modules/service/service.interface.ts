import { Model, ObjectId } from "mongoose";

export interface IService {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
}

export interface IServiceMethod extends Model<IService> {
  getServiceById(id: ObjectId): Promise<IService>;
}
