import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import bcryptjs from "bcryptjs";
import { AuthError, type NextAuthConfig } from "next-auth";
import { User } from "@prisma/client";
import { db } from "../lib/db";

export class LoginError extends AuthError {
  message = "Invalid credentials";
}

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    Credentials({
      async authorize(creds): Promise<User | null> {
        const { email, password } = creds;
        if (!email || !password) throw new LoginError();

        const user = await db.user.findUnique({
          where: {
            email: email as string,
          },
        });

        if (!user) throw new LoginError();

        const isValidPass = await bcryptjs.compare(
          password as string,
          user.password as string,
        );
        if (!isValidPass) throw new LoginError();

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
