/* eslint-disable no-unused-vars */
import { Model, ObjectId } from "mongoose";

export interface IService {
  _id?: ObjectId;
  name: string;
  categoryId: number;
  description: string;
  coverImage: string;
  price: number;
  duration: number;
  isDeleted: boolean;
}

export interface IServiceMethod extends Model<IService> {
  getServiceById(id: ObjectId): Promise<IService>;
}
