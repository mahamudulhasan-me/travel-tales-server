import { ServiceModel } from "../service/service.model";
import { ISlot } from "./slot.interface";
import { SlotModel } from "./sot.model";

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
      isBooked: "available",
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
  const query: any = { isBooked: "available" };

  if (date) query.date = date;
  if (serviceId) query.service = serviceId;

  const slots = await SlotModel.find(query).populate({
    path: "service",
  });
  return slots;
};

export const SlotServices = {
  createSlot,
  getSlots: getAvailableSlots,
};
