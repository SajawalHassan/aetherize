import { UserTier } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      tier: UserTier;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    tier: UserTier;
  }
}
