"use server";
import { loginSchema, registerSchema } from "@/schemas/auth-schema";
import bcryptjs from "bcryptjs";
import * as z from "zod";
import { db } from "@/lib/db";
import { signIn } from "@/next-auth/auth";
import { LoginError } from "@/next-auth/auth.config";
import { DEFAULT_LOGIN_REDIRECT } from "@/next-auth/auth-route-constants";

interface queryReturnType {
  success?: string;
  error?: string;
}

export const registerUserQuery = async (
  data: z.infer<typeof registerSchema>,
): Promise<queryReturnType> => {
  const validatedData = registerSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  try {
    const salt = 10;
    const hashedPassword = await bcryptjs.hash(
      validatedData.data.password,
      salt,
    );

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

export const signInQuery = async (
  provider: string,
  data?: Record<string, unknown>,
) => {
  await signIn(provider, {
    ...data,
    redirect: true,
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });
};

export const loginCredQuery = async (
  data: z.infer<typeof loginSchema>,
): Promise<queryReturnType> => {
  const validatedData = loginSchema.safeParse(data);
  if (!validatedData.success) return { error: "Invalid fields" };

  try {
    await signInQuery("credentials", {
      email: validatedData.data.email,
      password: validatedData.data.password,
    });

    return { success: "User created successfully!" };
  } catch (error) {
    if (error instanceof LoginError) {
      return { error: error.message };
    }
    throw error;
  }
};
