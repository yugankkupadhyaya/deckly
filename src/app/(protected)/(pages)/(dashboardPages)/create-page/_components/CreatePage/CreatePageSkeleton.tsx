'use client';

import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { containerVariants, itemVariants } from '@/lib/constants';
import RecentPrompts from '../GenerateAi/RecentPrompts';

const CreatePageSkeleton = () => {
     return (
       <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Header Skeleton */}
        <motion.div
        variants={itemVariants}
        className="flex flex-col items-center space-y-3"
      >
        <Skeleton className="h-10 w-[420px] rounded-xl" />
        <Skeleton className="h-5 w-[300px] rounded-lg" />
      </motion.div>

      {/* Cards Skeleton */}
      <motion.div
        variants={containerVariants}
        className="grid gap-6 md:grid-cols-3"
      >
        {[1, 2, 3].map((_, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="rounded-xl p-px bg-border"
          >
                <div className="w-full h-full rounded-xl bg-card p-6 flex flex-col justify-between">
              {/* Card content */}
              <div className="space-y-4">
                <Skeleton className="h-5 w-1/2 rounded-lg" />
                <Skeleton className="h-10 w-3/4 rounded-xl" />
              </div>

              {/* Button skeleton */}
              <div className="self-end">
                <Skeleton className="h-8 w-24 rounded-xl" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <RecentPrompts/>
    </motion.div>
  );
};

export default CreatePageSkeleton;
