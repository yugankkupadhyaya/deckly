// import { PrismaClient } from '@prisma/client';
// declare global {
//   var prisma: PrismaClient | undefined;
// }
// export const client = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const client = globalThis.prisma ?? new PrismaClient({ log: ['error'] });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = client;
}
