import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(30, { message: "Name must be no more than 30 characters" }),
  description: z
    .string()
    .trim()
    .min(5, { message: "Description must be at least 5 characters" })
    .max(2500, { message: "Description must be no more than 2500 characters" })
    .optional(),
  price: z
    .string()
    .transform(parseFloat)
    .refine((value) => !isNaN(value), {
      message: "Price is required",
    })
    .refine((value) => value >= 0.99 && value <= 10000, {
      message: "Price must be between 0.99 and 10000",
    }),
  colors: z
    .array(z.any())
    .min(1, { message: "At least one color is required" }),
});

export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(32, { message: "Password must be no more than 32 characters" }),
});

export const registerSchema = loginSchema
  .extend({
    name: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(32, { message: "Username must be no more than 32 characters" }),
    dateOfBirth: z.date(),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(32, { message: "Password must be no more than 32 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords should match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  name: z.string(),
  bio: z.string(),
  profileImage: z.string().url(),
  address: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  dataOfBirth: z.date(),
  phoneNumber: z.string(),
});
