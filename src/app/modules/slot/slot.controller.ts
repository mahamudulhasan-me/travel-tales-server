import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.service";

const createSlot = asyncHandler(async (req, res, next) => {
  const createdSlot = await SlotServices.createSlot(req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Slot created successfully",
    data: createdSlot,
  });
});

interface GetAvailableSlotsParams {
  date?: string;
  serviceId?: string;
}

const getAvailableSlots = asyncHandler(async (req, res, next) => {
  const { date, serviceId } = req.query;
  const slots = await SlotServices.getSlots({
    date,
    serviceId,
  } as GetAvailableSlotsParams);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Available slots retrieved successfully",
    data: slots,
  });
});

export const SlotControllers = {
  createSlot,
  getAvailableSlots,
};
