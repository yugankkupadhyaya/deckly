'use server';

import { currentUser } from '@clerk/nextjs/server';
import { client } from '../../lib/prisma';

export const onAuthenticateUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return { status: 403, user: null };
  }

  const email = clerkUser.emailAddresses[0].emailAddress;

  try {
    // 1️⃣ Try by clerkId first
    let dbUser = await client.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: {
        purchasedProjects: { select: { id: true } },
      },
    });

    // 2️⃣ Fallback: find by email
    if (!dbUser) {
      dbUser = await client.user.findUnique({
        where: { email },
        include: {
          purchasedProjects: { select: { id: true } },
        },
      });

      // 3️⃣ If found by email, link clerkId
      if (dbUser) {
        dbUser = await client.user.update({
          where: { email },
          data: { clerkId: clerkUser.id },
        });
      }
    }

    // 4️⃣ If user exists now → return
    if (dbUser) {
      return { status: 200, user: dbUser };
    }

    // 5️⃣ Otherwise create new user
    const newUser = await client.user.create({
      data: {
        clerkId: clerkUser.id,
        email,
        name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim(),
        profileImage: clerkUser.imageUrl,
      },
    });

    return { status: 201, user: newUser };
  } catch (error) {
    console.error('❌ Error creating user:', error);
    return { status: 500, user: null };
  }
};
