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

import { generateCreativePrompt } from '../../../../../../actions/ai.actions';
import { OutlineCard } from '../../../../../../../lib/types';
import { v4 } from 'uuid';
import { showErrorToast, showSuccessToast } from '../../../../../../../lib/toast';
import { createProject } from '../../../../../../actions/project';
import { useSlideStore } from '../../../../../../../store/useSlideStore';
import { title } from 'process';
import { Project } from '@prisma/client';

type Props = {
  onBack: () => void;
};

const CreativeAi = ({ onBack }: Props) => {
  const router = useRouter();
  const { setProject } = useSlideStore();
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
    if (res.status === 200 && res?.data?.outlines) {
      const cardsData: OutlineCard[] = [];
      res.data.outlines.map((outline: string, idx: number) => {
        const newCard = {
          id: v4(),
          title: outline,
          order: idx + 1,
        };
        cardsData.push(newCard);
      });
      addMultipleOutlines(cardsData);
      setNoOfCards(cardsData.length);
      showSuccessToast('Outline Generated Successfully');
    } else {
      showErrorToast('Failed to generate Outline.Please try again.');
    }
    setIsGenerating(false);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    if (outlines.length === 0) {
      showErrorToast('Please add at least one card to generate slides ');
      setIsGenerating(false);
      return;
    }
    try {
      console.log('DEBUG: Generating project with prompt:start');
      const res = await createProject(CurrentAiPrompt, outlines.slice(0, noOfCards));

      console.log('DEBUG createProject result:', res);

      if (res.status !== 200 || !res.data) {
        throw new Error('Unable to create project');
      }
      console.log(
        'DEBUG: Project created successfully, navigating to presentation page',
        res.data.id
      );
      router.push(`/presentation/${res.data.id}/select-theme`);
      setProject(res.data);
      addPrompt({
        id: v4(),
        title: CurrentAiPrompt || outlines?.[0]?.title,
        outlines: outlines,
        createdAt: new Date().toISOString(),
      });
      showSuccessToast('Project Successfully created ');
      setCurrentAIPrompt('');
      resetOutlines();
    } catch (error) {
      console.error(error);
      showErrorToast('Failed to create a project. Please try again.');
    } finally {
      setIsGenerating(false);
    }
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
            <>
              <Loader2 className="animate-spin"></Loader2>
              <span>Generating Outline...</span>
            </>
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
        <Button
          className="w-full flex items-center justify-center gap-2"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating...</span>
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
