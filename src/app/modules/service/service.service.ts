import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { IService } from "./service.interface";
import { ServiceModel } from "./service.model";

const createService = async (user: JwtPayload, payload: IService) => {
  const { email } = user;
  const isUserExist = await UserModel.isUserExist(email);

  if (!isUserExist) {
    throw new AppError(404, "User not found");
  }
  const createdService = await ServiceModel.create(payload);
  return createdService;
};

const getServices = async (params: {
  sortBy?: "price" | "duration" | undefined;
}): Promise<IService[]> => {
  const { sortBy } = params;

  // Define the sort object dynamically based on sortBy value
  const sortOption: Record<string, -1 | 1> = {};
  if (sortBy === "price") {
    sortOption.price = 1; // 1 for ascending, -1 for descending
  } else if (sortBy === "duration") {
    sortOption.duration = 1;
  } else {
    sortOption.createdAt = -1; // Default to sorting by createdAt in descending order
  }

  const services = await ServiceModel.find({ isDeleted: false }).sort(
    sortOption
  );
  return services;
};

const getServiceById = async (id: string | ObjectId) => {
  const service = await ServiceModel.getServiceById(id as ObjectId);
  return service;
};

const updateService = async (id: string, payload: IService) => {
  const service = await ServiceModel.findById(id);
  if (!service) {
    throw new AppError(404, "Service not found");
  }
  service.set(payload);
  await service.save();
  return service;
};

const deleteService = async (id: string) => {
  const service = await ServiceModel.findById(id);

  if (!service) {
    throw new AppError(404, "Service not found");
  }
  service.isDeleted = true;
  await service.save();
  return service;
};

export const ServiceServices = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
