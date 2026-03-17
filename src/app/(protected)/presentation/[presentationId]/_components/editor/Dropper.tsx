'use client';

import React from 'react';
import { ContentItem } from '../../../../../../lib/types';
import { useSlideStore } from '../../../../../../store/useSlideStore';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

type DropperProps = {
  index: number;
  parentId: string;
  slideId: string;
};

const Dropper = ({ index, parentId, slideId }: DropperProps) => {
  const addComponentInSlide = useSlideStore((state) => state.addComponentInSlide);
  const isEditing = useSlideStore((state) => state.isEditing);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'CONTENT_ITEM',

    drop: (item: {
      type: string;
      componentType: string;
      label: string;
      component: ContentItem;
    }) => {
      if (item.type === 'component') {
        addComponentInSlide(slideId, { ...item.component, id: uuidv4() }, parentId || 'root', index);
      }
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [addComponentInSlide, slideId, parentId, index]);

  const isDroppable = isEditing;

  if (!isDroppable) return null;

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        'h-8 rounded-lg border-2 border-dashed flex items-center justify-center text-xs transition-all duration-200 my-1',
        isOver && canDrop 
          ? 'border-blue-500 bg-blue-500/10 dark:bg-blue-500/20 scale-y-110' 
          : canDrop 
            ? 'border-zinc-300 dark:border-zinc-600 hover:border-blue-400 dark:hover:border-blue-500 bg-zinc-50 dark:bg-zinc-900/50'
            : 'border-transparent h-2 my-0'
      )}
    >
      {canDrop && (
        <div className={cn(
          "flex items-center gap-1.5 transition-all",
          isOver ? "text-blue-500 font-medium" : "text-zinc-400"
        )}>
          <Plus className="w-3 h-3" />
          <span>Drop here</span>
        </div>
      )}
    </div>
  );
};

export default Dropper;
