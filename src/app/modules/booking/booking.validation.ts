import { z } from "zod";

export const ZodCreateBookingSchema = z.object({
  body: z.object({
    service: z.string({
      required_error: "Service id is required",
      invalid_type_error: "Service id must be a string",
    }),
    slot: z.string({
      required_error: "Slot id is required",
      invalid_type_error: "Slot id must be a string",
    }),
    paymentStatus: z.string({
      required_error: "Payment status is required",
      invalid_type_error: "Payment status must be a string",
    }),
  }),
});
