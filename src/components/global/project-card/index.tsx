'use client';
import { cn } from '@/lib/utils';

import { JsonValue } from '@prisma/client/runtime/library';
import React from 'react';

import { motion } from 'framer-motion';
import { itemVariants } from '../../../lib/constants';
import { useSlideStore } from '../../../store/useSlideStore';
import { useRouter } from 'next/navigation';
import ThumbnailPreview from './thumbnail-preview';
import { Theme } from './../../../lib/types';

type Props = {
  projectId: string;
  title: string;
  createdAt: string;
  src: string;
  isDeleted?: boolean;
  slideData: JsonValue;
};

const ProjectCard = ({ projectId, title, createdAt, src, isDeleted, slideData }: Props) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();

  const handleNavigate = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`/presentation/${projectId}`);
  };
  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        'group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors',
        isDeleted && 'hover:bg-muted/50'
      )}
    >
      <div
        className="relative aspect-16/10 overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigate}
      >
        <ThumbnailPreview slide={undefined} theme={Theme} />
      </div>
    </motion.div>
  );
};

export default ProjectCard;
