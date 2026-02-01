// import { PrismaClient } from '@prisma/client';
// declare global {
//   var prisma: PrismaClient | undefined;
// }
// export const client = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const client =
  globalThis.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = client;
}
