'use client';
import { Project } from '@prisma/client';
import React, { useState } from 'react';
import AlertDialogBox from '../../../../../../components/global/alert-dialog';
import { Button } from '../../../../../../components/ui/button';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { showErrorToast } from '../../../../../../lib/toast';
import { deleteAllProjects } from '../../../../../actions/project';

type Props = {
  projects: Project[];
};

const DeleteAllButton = ({ projects }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDeleteAllProjects = async () => {
    setLoading(true);

    if (projects.length === 0) {
      setLoading(false);
      showErrorToast('No Projects found');
      return;
    }

    try {
      const res = await deleteAllProjects(projects.map((project) => project.id));

      if (res.status !== 200) {
        throw new Error('Failed to delete all projects');
      }

      router.refresh();
      setOpen(false);
    } catch (error) {
      showErrorToast('Failed to delete all projects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialogBox
      description="This action cannot be undone. This will permanently delete all your projects and remove your data from our servers."
      className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
      onclick={handleDeleteAllProjects}
      loading={loading}
      handleOpen={() => setOpen(!open)}
      open={open}
    >
      <Button className="flex items-center gap-2">
        <Trash size={16} />
        Delete all
      </Button>
    </AlertDialogBox>
  );
};

export default DeleteAllButton;
