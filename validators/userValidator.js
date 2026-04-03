import { z } from "zod"

export const userSchemaValidatorRegister = z.object({
  name: z.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username cannot exceed 50 characters"),
  email: z.string()
    .trim()
    .email("Invalid email"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
})

export const userValidatorlogin = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password too short")
})