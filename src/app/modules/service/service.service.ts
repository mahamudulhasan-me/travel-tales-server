import { JwtPayload } from "jsonwebtoken";
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

export const ServiceServices = {
  createService,
};
