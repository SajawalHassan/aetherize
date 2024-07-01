import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { db } from "../lib/db";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (!token.sub || !session.user) return session;

      session.user.tier = token.tier;

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      if (!existingUser) {
        console.error("No user found!");
        return token;
      }

      token.tier = existingUser.tier;
      token.id = existingUser.id;

      return token;
    },
  },
});
