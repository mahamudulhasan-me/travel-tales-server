import { JwtPayload } from "jsonwebtoken";
import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";

const createService = asyncHandler(async (req, res) => {
  const createdService = await ServiceServices.createService(
    req.user as JwtPayload,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service created successfully",
    data: createdService,
  });
});

const getServices = asyncHandler(async (req, res) => {
  const services = await ServiceServices.getServices();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Services retrieved successfully",
    data: services,
  });
});

const getServiceById = asyncHandler(async (req, res) => {
  const service = await ServiceServices.getServiceById(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service retrieved successfully",
    data: service,
  });
});

const updateService = asyncHandler(async (req, res) => {
  const updatedService = await ServiceServices.updateService(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service updated successfully",
    data: updatedService,
  });
});

const deleteService = asyncHandler(async (req, res) => {
  const deletedService = await ServiceServices.deleteService(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Service deleted successfully",
    data: deletedService,
  });
});

export const ServiceControllers = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
