'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../../../../../../../lib/constants';
import { Button } from '../../../../../../../components/ui/button';
import { ChevronLeft, Sparkle, SparkleIcon } from 'lucide-react';
import { isKeyObject } from 'util/types';
import { Input } from '../../../../../../../components/ui/input';
import useCreativeAIStore from './../../../../../../../store/useCreativeAiStore';
import { currentUser } from '@clerk/nextjs/server';

type Props = {
  onBack: () => void;
};

const CreativeAi = ({ onBack }: Props) => {
  const router = useRouter();
  const { CurrentAiPrompt, setCurrentAIPrompt } = useCreativeAIStore();

  const handleBack = () => {
    onBack();
  };

  return (
    <motion.div
      className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack} className="mb-4" variant={'outline'}>
        <ChevronLeft className="mr-2 h4 w-4" />
        Back
      </Button>
      <motion.div variants={itemVariants} className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          Generate with <span className="text-vivid">Creative AI</span>
        </h1>
        <p className="text-secondary">What would you like to create today?</p>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center w-full">
        <div
          className="
      flex
      items-center
      w-full
      sm:w-[70%]
      max-w-3xl
      h-11
      sm:h-12
      rounded-full
      bg-primary-foreground
      border
      border-white/10
      px-5
      backdrop-blur
      transition-colors
      focus-within:border-white/20
    "
        >
          <SparkleIcon />

          {/* Input */}
          <input
            type="text"
            placeholder="Enter Prompt and add to the cards.."
            className="
        w-full
        bg-transparent
        border-none
        outline-none
        text-sm
        sm:text-base
        text-foreground
        placeholder:text-muted-foreground
        pl-3
      "
            value={CurrentAiPrompt}
            onChange={(e) => setCurrentAIPrompt(e.target.value)}
          />
        </div>
<div className='flex items-center gap-3'>
  <select/>
</div>

      </motion.div>
    </motion.div>
  );
};

export default CreativeAi;
