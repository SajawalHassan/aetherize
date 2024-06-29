"use server";
import { registerSchema } from "@/schemas/auth-schema";
import bcrypt from "bcrypt";
import * as z from "zod";
import { db } from "@/lib/db";

interface queryReturnType {
  success?: string;
  error?: string;
}

export const registerUser = async (
  data: z.infer<typeof registerSchema>,
): Promise<queryReturnType> => {
  const validatedData = registerSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(validatedData.data.password, salt);

    const user = await db.user.findUnique({
      where: {
        email: validatedData.data.email,
      },
    });

    if (user) return { error: "Email already exists!" };

    await db.user.create({
      data: {
        email: validatedData.data.email,
        name: validatedData.data.username,
        password: hashedPassword,
        tier: "FREE",
      },
    });

    return { success: "User created successfully!" };
  } catch (_error) {
    return { error: "Opps! Something went wrong" };
  }
};
