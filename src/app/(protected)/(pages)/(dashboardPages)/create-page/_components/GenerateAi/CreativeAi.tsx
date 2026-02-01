'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { containerVariants, itemVariants } from '../../../../../../../lib/constants';
import { Button } from '../../../../../../../components/ui/button';
import {
  ChevronLeft,
  Loader2,
  RotateCw,
  RotateCwSquareIcon,
  Sparkle,
  SparkleIcon,
} from 'lucide-react';
import { isKeyObject } from 'util/types';
import { Input } from '../../../../../../../components/ui/input';
import useCreativeAIStore from './../../../../../../../store/useCreativeAiStore';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CardList from '../Common/CardList';
import usePromptStore from '../../../../../../../store/usePromptStore';
import RecentPrompts from './RecentPrompts';
import { toast } from 'sonner';
import { currentUser } from '@clerk/nextjs/server';
import { generateCreativePrompt } from '../../../../../../../actions/chatgpt';

type Props = {
  onBack: () => void;
};

const CreativeAi = ({ onBack }: Props) => {
  const router = useRouter();

  const { prompts, addPrompt } = usePromptStore();
  const {
    CurrentAiPrompt,
    setCurrentAIPrompt,
    outlines,
    resetOutlines,
    addOutline,
    addMultipleOutlines,
  } = useCreativeAIStore();

  const [noOfCards, setNoOfCards] = useState(0);
  const [editingCards, setEditingCards] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const [editText, setEditText] = useState('');

  const handleBack = () => {
    onBack();
  };

  const resetCards = () => {
    setEditingCards(null);
    setSelectedCard(null);
    setEditText('');
    resetOutlines();
    setCurrentAIPrompt('');
  };

  const generateOutline = async () => {
    if (CurrentAiPrompt == '') {
      toast.error('Error', { description: 'Please enter a prompt' });
      return;
    }
    setIsGenerating(true);
    const res = await generateCreativePrompt(CurrentAiPrompt);

    //wip:use open ai and complete this function
  };

  const handleGenerate = () => {};

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

      <motion.div
        variants={itemVariants}
        className="
    mx-auto
    flex items-center
    w-full sm:w-[70%] max-w-3xl
    h-11 sm:h-12
    rounded-full
    bg-primary-foreground
    border border-white/10
    px-4 gap-3
    backdrop-blur
    transition-colors
    focus-within:border-white/20
  "
      >
        {/* LEFT: Icon + Input */}
        <div className="flex items-center flex-1">
          <SparkleIcon className="h-4 w-4 text-muted-foreground" />

          <input
            type="text"
            placeholder="Enter prompt and add to the cards..."
            className="
        w-full
        bg-transparent
        border-none
        outline-none
        text-sm sm:text-base
        text-foreground
        placeholder:text-muted-foreground
        pl-3
      "
            value={CurrentAiPrompt}
            onChange={(e) => setCurrentAIPrompt(e.target.value)}
          />
        </div>

        <Select
          value={noOfCards.toString()}
          onValueChange={(value) => setNoOfCards(parseInt(value))}
        >
          <SelectTrigger
            className="
        h-8
        rounded-full
        px-3
        text-sm
        font-semibold
        bg-background
        border border-white/10
        shadow-none
        focus:ring-0
      "
          >
            <SelectValue placeholder="Cards" />
          </SelectTrigger>

          <SelectContent>
            {outlines.length === 0 ? (
              <SelectItem value="0">No Cards</SelectItem>
            ) : (
              Array.from({ length: outlines.length }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Card' : 'Cards'}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        <Button variant={'ghost'} size={'icon'} onClick={resetCards} aria-label="Reset Cards">
          <RotateCw className="h-4 w-4" />
        </Button>
      </motion.div>
      <div className="w-full flex justify-center items-center">
        <Button
          className="font-medium text-lg flex gap-2 items-center"
          onClick={generateOutline}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <Loader2 className="animate-spin">Generating...</Loader2>
          ) : (
            'Generate Outline'
          )}
        </Button>
      </div>

      <CardList
        outlines={outlines}
        addOutline={addOutline}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCards}
        selectedCard={selectedCard}
        editText={editText}
        onEditChange={setEditText}
        onCardSelect={setSelectedCard}
        onCardDoubleClick={(id: any, title: string) => {
          setEditingCards(id);
          setEditText(title);
        }}
        setEditText={setEditText}
        setEditingCard={setEditingCards}
        setSelectedCard={setSelectedCard}
      />

      {outlines.length > 0 && (
        <Button className="w-full" onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" />
              Generating..
            </>
          ) : (
            'Generate'
          )}
        </Button>
      )}

      {prompts.length > 0 && <RecentPrompts />}
    </motion.div>
  );
};

export default CreativeAi;
