'use server';

import { currentUser } from '@clerk/nextjs/server';
import { client } from '../lib/prisma';

export const onAuthenticateUser = async () => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return { status: 403 };
    }

    const dbUser = await client.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: {
        purchasedProjects: {
          select: { id: true },
        },
      },
    });

    if (dbUser) {
      return {
        status: 200,
        user: dbUser,
      };
    }

    const newUser = await client.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: `${clerkUser.firstName ?? ''} ${clerkUser.lastName ?? ''}`.trim(),
        profileImage: clerkUser.imageUrl,
      },
    });

    return {
      status: 201,
      user: newUser,
    };
  } catch (error) {
    console.error('❌ Error creating user:', error);
    return { status: 500 };
  }
};
