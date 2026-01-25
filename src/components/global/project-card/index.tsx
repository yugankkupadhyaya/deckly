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

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  src: string;
  isDeleted?: boolean;
  slideData: JsonValue;
  themeName: string;
};

const ProjectCard = ({
  projectId,
  title,
  createdAt,
  src,
  isDeleted,
  slideData,
  themeName,
}: Props) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();

  // ✅ hooks at top level
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };

  const handleRecover = async () => {
    setLoading(true);
    // TODO: recovery logic
    setLoading(false);
    setOpen(false);
  };

  const theme = themes.find((theme) => theme.name === themeName);

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'group w-full flex flex-col gap-y-3 transition-colors',
        isDeleted && 'hover:bg-muted/50'
      )}
    >
      <div
        className="relative aspect-16/10 overflow-hidden rounded-lg cursor-pointer border border-border bg-muted/50 flex items-center justify-center"
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

      <div className="w-full">
        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
          {timeAgo(createdAt)}
        </p>

        {isDeleted && (
          <AlertDialogBox
            loading={loading}
            open={open}
            // onclick={handleRecover}
            handleOpen={() => setOpen(!open)}
            description="This will recover the project and restore the data"
            className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
          >
            <Button
              size="sm"
              variant="ghost"
              disabled={loading}
              className="bg-background-80 dark:hover:bg-background-90"
            >
              Recover
            </Button>
          </AlertDialogBox>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
