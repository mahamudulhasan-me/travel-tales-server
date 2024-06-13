import { JwtPayload } from "jsonwebtoken";
import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { ServiceServices } from "./service.service";

const createService = asyncHandler(async (req, res, next) => {
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

export const ServiceControllers = {
  createService,
};
