import { z } from "zod";
import parsePhoneNumber from "libphonenumber-js";

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
    .or(z.literal("")),
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

const phoneNumberSchema = z
  .string()
  .refine(
    (phoneNumber) => {
      const phoneNumberObject = parsePhoneNumber(phoneNumber);
      return phoneNumberObject ? phoneNumberObject.isValid() : false;
    },
    {
      message: "Invalid phone number",
    }
  )
  .or(z.literal(""));

const addressSchema = z
  .string()
  .refine(
    (address) => {
      const parts = address.split(",").map((part) => part.trim());
      return parts.length >= 3;
    },
    {
      message: "Address must contain a street, city, and country",
    }
  )
  .or(z.literal(""));

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(32, { message: "Name must be at most 32 characters" }),
  bio: z
    .string()
    .min(25, { message: "Bio must be at least 25 characters" })
    .max(2500, { message: "Bio must be at most 2500 characters" })
    .or(z.literal("")),
  profileImage: z.string().url(),
  address: addressSchema,
  dateOfBirth: z.date().optional(),
  image: z.string().url().optional(),
  phoneNumber: phoneNumberSchema.optional(),
});
