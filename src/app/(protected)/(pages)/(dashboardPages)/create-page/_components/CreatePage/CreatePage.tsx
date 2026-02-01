'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { containerVariants, itemVariants, CreatePageCard } from '@/lib/constants';
import { cn } from '@/lib/utils';
import usePromptStore from '../../../../../../../store/usePromptStore';
import RecentPrompts from '../GenerateAi/RecentPrompts';
import { useEffect } from 'react';

type Props = {
  onSelectOption: (option: string) => void;
};

const CreatePage = ({ onSelectOption }: Props) => {
  const { prompts, setPage } = usePromptStore();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">How would you like to get started?</h1>
        <p className="text-secondary">Choose your preferred method to begin</p>
      </motion.div>

      {/* Cards */}
      <motion.div variants={containerVariants} className="grid gap-6 md:grid-cols-3">
        {CreatePageCard.map((option) => (
          <motion.div
            key={option.type}
            variants={itemVariants}
            whileHover={{
              scale: 1.04,
              rotate: option.highlight ? 0.5 : 0,
              transition: { duration: 0.15 },
            }}
            className={cn(
              'rounded-xl p-px transition-all duration-300 ease-in-out',
              option.highlight ? 'bg-vivid-gradient' : 'hover:bg-vivid-border'
            )}
          >
            {/* Inner card */}
            <motion.div
              className={cn(
                'w-full h-full rounded-xl bg-card p-6 flex flex-col gap-y-6',
                option.highlight && 'vivid-glow'
              )}
            >
              {/* Content */}
              <div className="flex flex-col gap-y-3">
                <div>
                  <p className="text-primary text-lg font-semibold">{option.title}</p>

                  <p
                    className={cn(
                      'text-4xl font-bold leading-tight',
                      option.highlight ? 'text-vivid' : 'text-primary'
                    )}
                  >
                    {option.highlightedText}
                  </p>
                </div>
              </div>

              {/* Action */}
              <motion.div
                className="self-end"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={option.highlight ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-xl font-bold cursor-pointer"
                  onClick={() => onSelectOption(option.type)}
                >
                  {option.highlight ? 'Generate' : 'Continue'}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      {prompts.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreatePage;
