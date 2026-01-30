'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { OutlineCard } from '../../../../../../../lib/types';
import { HTMLInputAutoCompleteAttribute, useRef } from 'react';
import UICard from './Card';

type Props = {
  card: OutlineCard;
  isEditing: boolean;
  isSelected: boolean;
  editText: string;
  onEditChange: (value: string) => void;
  onEditBlur: () => void;
  onEditKeyDown: (e: React.KeyboardEvent) => void;
  onCardClick: () => void;
  onCardDoubleClick: () => void;
  onDeleteClick: () => void;
  dragHandlers: {
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  };
  onDragOver: (e: React.DragEvent) => void;
  dragOverStyles: React.CSSProperties;
};

 const Card = ({
  card,
  isEditing,
  isSelected,
  editText,
  onEditChange,
  onEditBlur,
  onEditKeyDown,
  onCardClick,
  onCardDoubleClick,
  onDeleteClick,
  dragHandlers: { onDragStart, onDragEnd },
  onDragOver,
  dragOverStyles,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
        mass: 1,
      }}
      className="relative"
    >
      <div
        draggable
        style={dragOverStyles}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
       
      </div>
    </motion.div>
  );
};

export default Card;
