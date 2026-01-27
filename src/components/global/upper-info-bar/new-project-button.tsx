'use client';
import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '../../ui/button';
import { Plus } from 'lucide-react';
import { User } from '@prisma/client';

type Props = {
  user: User;
};

const NewProjectButton = ({ user }: Props) => {
  // push handle needs completion
  const router = useRouter();
  return (
    <Button
      size={'lg'}
      className="rounded-lg font-semibold"
      // disabled={!user.subscription}
      onClick={() => router.push('/create-page')}
    >
      <Plus></Plus>
      New Project
    </Button>
  );
};

export default NewProjectButton;
