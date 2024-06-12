import { z } from "zod";

export const ZodSignupValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
  }),
  password: z.string().min(8),
  phone: z.string().min(11),
  role: z.enum(["admin", "user"]),
  address: z.string(),
});
