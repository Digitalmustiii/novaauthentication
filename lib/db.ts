// lib/db.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // For hot-reload in development, avoid creating multiple clients
  var prisma: PrismaClient | undefined;
}

export const db =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV === "development") global.prisma = db;
