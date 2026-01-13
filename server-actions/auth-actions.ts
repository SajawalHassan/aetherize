"use server";

import { signIn } from "@/lib/auth/auth";
import { hashPassword } from "@/lib/auth/password-funcs";
import { UserRegisterResponse } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { authSchema } from "@/lib/schemas";
import z from "zod";

export const logInWithGoogle = async () => {
  await signIn("google");
};

export const createUser = async (data: z.infer<typeof authSchema>) => {
  const { email, password, firstName, lastName } = data;
  if (!email || !password || !firstName || !lastName)
    throw new Error(UserRegisterResponse.ERR_MISSINGFIELD);

  const _user = await prisma.user.findUnique({
    where: { email },
  });

  if (_user) throw new Error(UserRegisterResponse.ERR_EMAIL);

  try {
    const hashedPassword = await hashPassword(password);
    const name = firstName + lastName;

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return UserRegisterResponse.SUCCESSFUL;
  } catch (error) {
    console.log(error);
    throw new Error(UserRegisterResponse.ERROR);
  }
};
