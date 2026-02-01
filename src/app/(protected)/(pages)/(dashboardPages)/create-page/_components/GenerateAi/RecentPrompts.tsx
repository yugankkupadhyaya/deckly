import React from 'react';
import usePromptStore from '../../../../../../../store/usePromptStore';
import { motion, Variants } from 'framer-motion';
import { containerVariants, itemVariants } from '../../../../../../../lib/constants';
import { Card } from '../../../../../../../components/ui/card';
import { timeAgo } from '@/lib/utils';
import { time } from 'console';
import { Button } from '../../../../../../../components/ui/button';
import { OutlineCard } from '../../../../../../../lib/types';

import { toast } from 'sonner';
import useCreativeAIStore from '../../../../../../../store/useCreativeAiStore';

type Props = {};

const RecentPrompts = (props: Props) => {
  const { prompts, setPage } = usePromptStore();
  const { addMultipleOutlines, addOutline, setCurrentAIPrompt, outlines } = useCreativeAIStore();

  const handleEdit = (id: string) => {
    const prompt = prompts.find((prompt) => prompt.id == id);
    if (prompt) {
      setPage('creative-ai');
      addMultipleOutlines(prompt?.outlines);
      setCurrentAIPrompt(prompt?.title);
    } else {
      toast.error('error', { description: 'prompt not found' });
    }
  };

  return (
    <motion.div variants={containerVariants} className="space-y-4 mt-20!">
      <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-center">
        Your recent Prompts
      </motion.h2>
      <motion.div variants={containerVariants} className="space-y-2 w-full lg:max-w-80% mx-auto">
        {prompts.map((prompt, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card className="p-4 items-center justify-between hover:bg-accent/50 transition-colors duration-300">
              <div className="max-w-70%">
                <h3 className="font-semibold text-xl line-clamp-1">{prompt.title}</h3>
                <p className="font-semibold text-sm text-muted-foreground">
                  {timeAgo(prompt.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-vivid">Creative Ai</span>
                <Button
                  variant="default"
                  size={'sm'}
                  className="rounded-xl bg-primary-20 dark:hover:bg-gray-700 hover:bg-gray-200 text-primary
                  cursor-pointer"
                  onClick={() => handleEdit(prompt.id)}
                >
                  Edit
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentPrompts;
function addMultipleOutlines(outlines: OutlineCard[]) {
  throw new Error('Function not implemented.');
}
