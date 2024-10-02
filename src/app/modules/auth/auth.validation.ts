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
    password: z.string().min(8),
    role: z.enum(["admin", "user"]),
    status: z.enum(["Basic", "Premium"], {
      required_error: "Status is required",
    }),
    phone: z.string().optional(),
    address: z.string().optional(),
    profileImage: z.string().optional(),
    coverImage: z.string().optional(),
    dateOfBirth: z.date().optional(),
  }),
});

export const ZodLoginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email address" }),
    password: z.string().min(6),
  }),
});
