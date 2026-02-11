'use client';

import { cn, timeAgo } from '@/lib/utils';
import { JsonValue } from '@prisma/client/runtime/library';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { itemVariants, themes } from '../../../lib/constants';
import { useSlideStore } from '../../../store/useSlideStore';
import ThumbnailPreview from './thumbnail-preview';
import AlertDialogBox from '../alert-dialog';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { toast } from 'sonner';
import { deleteProject, recoverProject } from '../../../app/actions/project';
import { useProjectStore } from '../../../store/useProjectStore';

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  isDeleted?: boolean;
  slideData: JsonValue;
  themeName: string;
};

const ProjectCard = ({
  projectId,
  title,
  createdAt,

  isDeleted,
  slideData,
  themeName,
}: Props) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();
  const { setProjects, removeProject } = useProjectStore();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const handleRecover = async () => {
    if (!projectId) {
      toast.error('Project not found');
      return;
    }

    setLoading(true);

    try {
      const res = await recoverProject(projectId);

      if (res.status !== 200) {
        toast.error('Oops!', {
          description: res.error || 'Failed to recover project',
        });
        return;
      }

      setOpen(false);
      router.refresh();
      toast.success('Success', {
        description: 'Project recovered successfully',
      });
    } catch (err) {
      toast.error('Oops!', {
        description: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!projectId) {
      setLoading(false);
      toast.error('Project not found');
      return;
    }
    try {
      const res = await deleteProject(projectId);
      if (res.status != 200) {
        toast.error('Oops!', {
          description: res.error || 'Failed to delete the project',
        });
        return;
      }
      removeProject(projectId);
      setOpen(false);
      router.refresh();
      toast.success('Success', {
        description: 'Project deleted successfully',
      });
    } catch (error) {
      console.log(error);
      toast.error('Oops!', {
        description: 'Something went wrong',
      });
    }
  };

  const theme = themes.find((theme) => theme.name === themeName);

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'group w-full flex flex-col gap-y-2 transition-colors',
        isDeleted && 'hover:bg-muted/50'
      )}
    >
      <div
        className="
          relative aspect-16/10 overflow-hidden rounded-xl cursor-pointer
          border border-border/60 bg-muted
          flex items-center justify-center
          transition-colors group-hover:border-border
        "
        onClick={handleNavigate}
      >
        {theme ? (
          <ThumbnailPreview theme={theme} />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Image className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
      </div>

      <p className="text-sm font-semibold text-foreground truncate">{title}</p>

      <div className="w-full flex items-center justify-between">
        <p className="text-xs text-muted-foreground" suppressHydrationWarning>
          {timeAgo(createdAt)}
        </p>

        {isDeleted ? (
          <AlertDialogBox
            onclick={handleRecover}
            loading={loading}
            open={open}
            handleOpen={() => setOpen(!open)}
            description="This will recover the project and restore the data"
            className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
          >
            <Button
              size="sm"
              variant="secondary"
              disabled={loading}
              className="
                h-7 px-3 text-xs rounded-md
                transition-all duration-150 ease-out
                hover:bg-secondary/80
                hover:scale-[1.03]
                active:scale-[0.96]
                active:bg-secondary/70
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
                disabled:opacity-50
                disabled:pointer-events-none
              "
            >
              Recover
            </Button>
          </AlertDialogBox>
        ) : (
          <AlertDialogBox
            onclick={handleDelete}
            loading={loading}
            open={open}
            handleOpen={() => setOpen(!open)}
            description="This will delete your project and send it to trash"
            className="bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
          >
            <Button
              size="sm"
              variant="secondary"
              disabled={loading}
              className="
                h-7 px-3 text-xs rounded-md
                transition-all duration-150 ease-out
                hover:bg-secondary/80
                hover:scale-[1.03]
                active:scale-[0.96]
                active:bg-secondary/70
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-ring
                focus-visible:ring-offset-2
                disabled:opacity-50
                disabled:pointer-events-none
              "
            >
              Delete
            </Button>
          </AlertDialogBox>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
