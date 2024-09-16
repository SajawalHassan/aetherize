import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// To not make multiple instances of prisma during development through hot reload.

declare global {
  var prisma: PrismaClient;
}

export const db = globalThis.prisma || new PrismaClient().$extends(withAccelerate());

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
