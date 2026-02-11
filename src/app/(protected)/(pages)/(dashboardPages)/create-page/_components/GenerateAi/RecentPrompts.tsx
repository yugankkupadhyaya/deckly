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
  const { prompts, setPage, removePrompt } = usePromptStore();
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
      <motion.div variants={containerVariants} className="space-y-6 max-w-4xl mx-auto">
        {prompts.map((prompt, i) => (
          <motion.div key={i} variants={itemVariants}>
            <Card
              className="
    w-full
    rounded-2xl
    px-6 py-5
    bg-muted/40
    border border-border/50
    transition-all duration-200
    hover:border-border
  "
            >
              <div className="flex flex-col gap-3">
                {/* Title */}
                <h3 className="text-lg font-semibold text-primary leading-tight">{prompt.title}</h3>

                {/* Meta */}
                <p className="text-sm text-muted-foreground">{timeAgo(prompt.createdAt)}</p>

                {/* Footer */}

                <div
                  className="
    flex flex-col gap-3
    sm:flex-row sm:items-center sm:justify-between
    pt-2
  "
                >
                  {/* Left badge */}
                  <span
                    className="
      inline-flex w-fit
      items-center
      rounded-full
      px-3 py-1
      text-xs font-semibold
      bg-vivid/10
      text-vivid
    "
                  >
                    Creative AI
                  </span>

                  {/* Actions */}
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleEdit(prompt.id)}
                      className="
        flex-1 sm:flex-none
        rounded-xl
        px-4
        font-semibold
        bg-background/60
        hover:bg-background/80
      "
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        removePrompt(prompt.id);
                        toast.success('Prompt removed');
                      }}
                      className="
        flex-1 sm:flex-none
        rounded-xl
        px-4
        text-destructive
        hover:bg-destructive/10
      "
                    >
                      Remove
                    </Button>
                  </div>
                </div>
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
