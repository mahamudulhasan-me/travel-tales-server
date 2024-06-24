import { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "mongoose";
import AppError from "../../errors/AppError";
import { UserModel } from "../user/user.model";
import { IService } from "./service.interface";
import { ServiceModel } from "./service.model";

const createService = async (user: JwtPayload, payload: IService) => {
  const { role, email } = user;
  const isUserExist = await UserModel.isUserExist(email);

  if (!isUserExist) {
    throw new AppError(404, "User not found");
  }
  const createdService = await ServiceModel.create(payload);
  return createdService;
};

const getServices = async () => {
  const services = await ServiceModel.find({ isDeleted: false });
  return services;
};

const getServiceById = async (id: ObjectId) => {
  const service = await ServiceModel.getServiceById(id);
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
