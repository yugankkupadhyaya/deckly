import { User } from '@prisma/client';

export const OUTLINE_LIMITS = {
  free: 5,
  subscribed: 10,
} as const;

export function getOutlineLimit(user: User) {
  return user.subscription ? OUTLINE_LIMITS.subscribed : OUTLINE_LIMITS.free;
}
