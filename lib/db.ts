import { PrismaClient } from '@prisma/client';

// Avoid multiple instances during hot reloading in development
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = db;
}