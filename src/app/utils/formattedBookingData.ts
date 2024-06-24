export const formattedBookingData = (
  data: any,
  includeCustomer: boolean = true
) => {
  const formatBooking = (booking: any) => ({
    _id: booking?._id,
    service: {
      _id: booking?.serviceId?._id,
      name: booking?.serviceId?.name,
      description: booking?.serviceId?.description,
      price: booking?.serviceId?.price,
      duration: booking?.serviceId?.duration,
      isDeleted: booking?.serviceId?.isDeleted,
    },
    slot: {
      _id: booking?.slotId?._id,
      date: booking?.slotId?.date,
      startTime: booking?.slotId?.startTime,
      endTime: booking?.slotId?.endTime,
      isBooked: booking?.slotId?.isBooked,
    },
    ...(includeCustomer && {
      customer: {
        _id: booking?.customer?._id,
        name: booking?.customer?.name,
        email: booking?.customer?.email,
        phone: booking?.customer?.phone,
        address: booking?.customer?.address,
      },
    }),
    vehicleType: booking.vehicleType,
    vehicleBrand: booking.vehicleBrand,
    vehicleModel: booking.vehicleModel,
    manufacturingYear: booking.manufacturingYear,
    registrationPlate: booking.registrationPlate,
    createdAt: booking?.createdAt,
    updatedAt: booking?.updatedAt,
  });

  if (Array.isArray(data)) {
    return data.map(formatBooking);
  } else {
    return formatBooking(data);
  }
};
