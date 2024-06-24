import { ServiceModel } from "../service/service.model";
import { SlotModel } from "../slot/sot.model";
import { IBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

const createBooking = async (payload: IBooking) => {
  await Promise.all([
    ServiceModel.getServiceById(payload.serviceId),
    SlotModel.getSlotById(payload.slotId),
  ]);

  const createdBooking = (await BookingModel.create(payload)).populate([
    { path: "service" },
    { path: "slot" },
  ]);
  return createdBooking;
};

export const BookingServices = {
  createBooking,
};
