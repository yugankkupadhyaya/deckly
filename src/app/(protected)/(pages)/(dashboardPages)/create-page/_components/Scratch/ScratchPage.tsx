'use client';
import { v4 as uuidv4, v4 } from 'uuid';

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
import { totalmem } from 'os';
import { toast } from 'sonner';
import { showErrorToast, showSuccessToast } from '../../../../../../../lib/toast';
import { createProject } from '../../../../../../../actions/project';
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
      showErrorToast('Please add at least one card to generate slides ');
      return;
    }
    const res = await createProject(outlines?.[0].title, outlines);
    if (res.status != 200) {
      showErrorToast('Failed to create this  project');
      return;
    }
    if (res.data) {
      setProject(res.data);
      resetOutlines();
      showSuccessToast('Project created successfully');
      router.push(`/presentation/${res.data.id}/select-theme`);
    } else {
      showErrorToast('Failed to create project');
    }
  };

  return (
    <motion.div
      className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Button onClick={handleBack}>
        <ChevronLeft />
      </Button>

      <h1 className="text-2xl sm:text-3xl font-bold text-primary">Prompt</h1>

      <motion.div className="bg-primary/10 rounded-xl p-4" variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-between gap-3 items-center">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Enter Prompt and add cards.."
            className="text-base sm:text-xl
            border-0 focus-visible:ring-0 shadow-none p-0 bg-transparent grow"
          />

          <div className="flex items-center gap-3">
            <Select value={selectedCount} onValueChange={setSelectedCount}>
              <SelectTrigger className="w-fit gap-2 font-semibold shadow-xl">
                <SelectValue placeholder="Select number of cards" />
              </SelectTrigger>

              <SelectContent className="w-fit">
                {outlines.length === 0 ? (
                  <SelectItem value="0" className="font-semibold">
                    No cards
                  </SelectItem>
                ) : (
                  Array.from({ length: outlines.length }, (_, idx) => idx + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()} className="font-semibold">
                      {num} {num === 1 ? 'Card' : 'Cards'}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            <Button variant={'ghost'} onClick={resetCards} size={'icon'} aria-label="Reset Cards">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

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
      <Button onClick={handleAddCard} variant={'secondary'} className="w-full bg-primary-10">
        Add Card
      </Button>

      {outlines?.length > 0 && (
        <Button className="w-full" onClick={handleGenerate}>
          Generate PPT
        </Button>
      )}
    </motion.div>
  );
};

export default ScratchPage;
