/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServiceModel } from "../service/service.model";
import { ISlot } from "./slot.interface";
import { SlotModel } from "./sot.model";

const getSlots = async () => {
  const slots = await SlotModel.find()
    .sort({ createdAt: -1 })
    .populate({ path: "service" });
  return slots;
};

const createSlot = async (payload: ISlot) => {
  const { service: serviceId, date, startTime, endTime } = payload;
  const service = await ServiceModel.findById(serviceId);

  if (!service) {
    throw new Error("Service not found");
  }

  const startTimeInMinutes = Number(startTime.split(":")[0]) * 60;
  const endTimeInMinutes = Number(endTime.split(":")[0]) * 60;
  const serviceDuration = service.duration; // Assuming service.duration is in minutes

  const totalSlots = (endTimeInMinutes - startTimeInMinutes) / serviceDuration;

  const slots: any[] = [];

  for (let i = 0; i < totalSlots; i++) {
    const slotStartTimeInMinutes = startTimeInMinutes + i * serviceDuration;
    const slotEndTimeInMinutes = slotStartTimeInMinutes + serviceDuration;

    const slotStartTime = `${Math.floor(slotStartTimeInMinutes / 60)
      .toString()
      .padStart(2, "0")}:${(slotStartTimeInMinutes % 60)
      .toString()
      .padStart(2, "0")}`;
    const slotEndTime = `${Math.floor(slotEndTimeInMinutes / 60)
      .toString()
      .padStart(2, "0")}:${(slotEndTimeInMinutes % 60)
      .toString()
      .padStart(2, "0")}`;

    const slot = {
      service: serviceId,
      date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: false,
      status: "available",
    };

    slots.push(slot);
  }

  const createdSlots = await SlotModel.insertMany(slots);
  return createdSlots;
};

interface GetAvailableSlotsParams {
  date?: string;
  serviceId?: string;
}
const getAvailableSlots = async ({
  date,
  serviceId,
}: GetAvailableSlotsParams) => {
  const query: any = { isBooked: true, status: "available" };

  if (date) query.date = date;
  if (serviceId) query.service = serviceId;

  const slots = await SlotModel.find(query).populate({
    path: "service",
  });
  return slots;
};

const updateSlot = async (id: string, payload: ISlot) => {
  const updatedSlot = await SlotModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedSlot;
};

const getSlotsByServiceId = async (serviceId: string) => {
  const slots = await SlotModel.find({ service: serviceId });
  return slots;
};
export const SlotServices = {
  createSlot,
  getSlots,
  getAvailableSlots,
  updateSlot,
  getSlotsByServiceId,
};
