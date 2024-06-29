import * as z from "zod";

export const registerSchema = z.object({
  username: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
