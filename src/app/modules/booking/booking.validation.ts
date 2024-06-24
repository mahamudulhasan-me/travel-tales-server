import { z } from "zod";

export const ZodCreateBookingSchema = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: "Service id is required",
      invalid_type_error: "Service id must be a string",
    }),
    slotId: z.string({
      required_error: "Slot id is required",
      invalid_type_error: "Slot id must be a string",
    }),
    vehicleType: z.string({
      required_error: "Vehicle type is required",
      invalid_type_error: "Vehicle type must be a string",
    }),
    vehicleBrand: z.string({
      required_error: "Vehicle brand is required",
      invalid_type_error: "Vehicle brand must be a string",
    }),
    vehicleModel: z.string({
      required_error: "Vehicle model is required",
      invalid_type_error: "Vehicle model must be a string",
    }),
    manufacturingYear: z.number({
      required_error: "Manufacturing year is required",
      invalid_type_error: "Manufacturing year must be a number",
    }),
    registrationPlate: z.string({
      required_error: "Registration plate is required",
      invalid_type_error: "Registration plate must be a string",
    }),
  }),
});
