import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "./password-funcs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) throw new Error("Invalid Email.");

        const isValid = await verifyPassword(
          credentials.password as string,
          user.password as string
        );
        if (!isValid) {
          throw new Error("Invalid Password.");
        }

        return user;
      },
    }),
  ],
});
