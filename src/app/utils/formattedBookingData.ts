export const formattedBookingData = (
  data: any,
  includeCustomer: boolean = true
) => {
  const formatBooking = (booking: any) => ({
    _id: booking?._id,
    service: {
      _id: booking?.service?._id,
      name: booking?.service?.name,
      description: booking?.service?.description,
      price: booking?.service?.price,
      duration: booking?.service?.duration,
      isDeleted: booking?.service?.isDeleted,
    },
    slot: {
      _id: booking?.slot?._id,
      date: booking?.slot?.date,
      startTime: booking?.slot?.startTime,
      endTime: booking?.slot?.endTime,
      isBooked: booking?.slot?.isBooked,
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
