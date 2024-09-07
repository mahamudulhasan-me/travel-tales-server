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

const getServices = async ({
  sortBy,
  categoryId,
}: getServicesParams): Promise<IService[]> => {
  const query: Record<string, unknown> = { isDeleted: false };
  if (categoryId) query.categoryId = categoryId;

  const services = await ServiceModel.find(query).sort(
    sortBy ? { [sortBy]: 1 } : { createdAt: -1 }
  );
  return services;
};

export interface getServicesParams {
  sortBy?: "price" | "duration" | "categoryId";
  categoryId?: number;
}

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
