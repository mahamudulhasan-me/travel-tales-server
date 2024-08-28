import { ObjectId, Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import { IService, IServiceMethod } from "./service.interface";

const serviceSchema = new Schema<IService>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    coverImage: { type: String, required: true },
    duration: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

serviceSchema.statics.getServiceById = async function (id: string | ObjectId) {
  const service = await ServiceModel.findOne({ _id: id, isDeleted: false });
  if (!service) {
    throw new AppError(404, "Service not found");
  }
  return service;
};

export const ServiceModel = model<IService, IServiceMethod>(
  "service",
  serviceSchema
);
