'use client';

import { v4 as v4 } from 'uuid';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../../../../../../../lib/constants';
import { Button } from '../../../../../../../components/ui/button';
import { ChevronLeft, RotateCcw } from 'lucide-react';
import { useScratchStore } from '../../../../../../../store/useStartScratchStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../../components/ui/select';
import { useState } from 'react';
import { Input } from '../../../../../../../components/ui/input';
import CardList from '../Common/CardList';
import { OutlineCard } from '../../../../../../../lib/types';
import { showErrorToast, showSuccessToast } from '../../../../../../../lib/toast';
import { createProject } from '../../../../../../actions/project';
import { useSlideStore } from '../../../../../../../store/useSlideStore';
import { useRouter } from 'next/navigation';

type Props = {
  onBack: () => void;
};

const ScratchPage = ({ onBack }: Props) => {
  const router = useRouter();
  const { setProject } = useSlideStore();
  const { resetOutlines, outlines, addMultipleOutlines, addOutlines } = useScratchStore();

  const [selectedCount, setSelectedCount] = useState('0');
  const [editText, setEditText] = useState('');
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleBack = () => {
    resetOutlines();
    onBack();
  };

  const resetCards = () => {
    setEditText('');
    resetOutlines();
  };

  const handleAddCard = () => {
    const newCard: OutlineCard = {
      id: v4(),
      title: editText || 'New Section',
      order: outlines.length + 1,
    };
    setEditText('');
    addOutlines(newCard);
  };

  const handleGenerate = async () => {
    if (outlines.length === 0) {
      showErrorToast('Please add at least one card to generate slides');
      return;
    }

    const res = await createProject(outlines[0].title, outlines);
    if (res.status !== 200 || !res.data) {
      showErrorToast('Failed to create project');
      return;
    }

    setProject(res.data);
    resetOutlines();
    showSuccessToast('Project created successfully');
    router.push(`/presentation/${res.data.id}/select-theme`);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        w-full max-w-4xl mx-auto
        px-4 sm:px-6 lg:px-8
        space-y-10
      "
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button onClick={handleBack} variant="ghost" size="icon" className="rounded-full">
          <ChevronLeft />
        </Button>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Prompt</h1>
      </div>

      {/* Prompt Bar */}
      <motion.div
        variants={itemVariants}
        className="
          mx-auto
          w-full
          max-w-3xl
          flex items-center
          gap-4
          h-14
          px-5
          rounded-full

          bg-muted
          border border-border
          shadow-md

          dark:bg-neutral-900/80
          dark:border-white/15

          transition-all
          focus-within:ring-1
          focus-within:ring-ring
        "
      >
        <Input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          placeholder="Enter Prompt and add cards.."
          className="
            flex-1
            bg-transparent
            border-none
            outline-none
            focus-visible:ring-0
            text-[15px]
            text-foreground
            placeholder:text-foreground/50
          "
        />

        <Select value={selectedCount} onValueChange={setSelectedCount}>
          <SelectTrigger
            className="
              h-9
              px-3
              rounded-full
              bg-background
              border border-border
              text-sm
              text-foreground
              shadow-sm
            "
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {outlines.length === 0 ? (
              <SelectItem value="0">No cards</SelectItem>
            ) : (
              Array.from({ length: outlines.length }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Card' : 'Cards'}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          size="icon"
          onClick={resetCards}
          className="rounded-full"
          aria-label="Reset Cards"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Cards */}
      <CardList
        outlines={outlines}
        addOutline={addOutlines}
        addMultipleOutlines={addMultipleOutlines}
        editingCard={editingCard}
        selectedCard={selectedCard}
        editText={editText}
        onEditChange={setEditText}
        onCardSelect={setSelectedCard}
        onCardDoubleClick={(id: any, title: string) => {
          setEditingCard(id);
          setEditText(title);
        }}
        setEditText={setEditText}
        setEditingCard={setEditingCard}
        setSelectedCard={setSelectedCard}
      />

      {/* Add Card */}
      <div className="flex justify-center">
        <Button
          onClick={handleAddCard}
          variant="secondary"
          className="
            h-11
            px-10
            rounded-full
            font-medium
          "
        >
          Add Card
        </Button>
      </div>

      {/* Generate */}
      {outlines.length > 0 && (
        <Button onClick={handleGenerate} className="w-full h-12 text-base">
          Generate PPT
        </Button>
      )}
    </motion.div>
  );
};

export default ScratchPage;
