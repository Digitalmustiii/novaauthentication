// lib/db.ts
import { PrismaClient } from "@prisma/client";

/* eslint-disable no-var */
// Tell TypeScript that `global.prisma` may exist
declare global {
  var prisma: PrismaClient | undefined;
}
/* eslint-enable no-var */

export const db =
  global.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

// In development, reuse the client to avoid exhausting connections
if (process.env.NODE_ENV === "development") {
  global.prisma = db;
}
