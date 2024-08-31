import asyncHandler from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { SlotServices } from "./slot.service";

const getSlots = asyncHandler(async (req, res) => {
  const slots = await SlotServices.getSlots();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Slots retrieved successfully",
    data: slots,
  });
});

const createSlot = asyncHandler(async (req, res) => {
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

const getAvailableSlots = asyncHandler(async (req, res) => {
  const { date, serviceId } = req.query;
  const slots = await SlotServices.getAvailableSlots({
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

const updateSlot = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedSlot = await SlotServices.updateSlot(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Slot updated successfully",
    data: updatedSlot,
  });
});
export const SlotControllers = {
  createSlot,
  getSlots,
  getAvailableSlots,
  updateSlot,
};
