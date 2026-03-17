import React, { useRef } from 'react';
import { LayoutSlides } from '../../../../../../lib/types';
import { cn } from '../../../../../../lib/utils';
import { useDrop } from 'react-dnd';
import { useSlideStore } from '@/store/useSlideStore';

type Props = {
  index: number;
  onDrop: (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => void;
  isEditable: boolean;
};

const DropZone = ({ index, onDrop, isEditable }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const isEditing = useSlideStore((state) => state.isEditing);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ['SLIDE', 'Layout'],

    drop: (item: { type: string; layoutType: string; component: LayoutSlides; index?: number }) => {
      if (isEditing) {
        onDrop(item, index);
      }
    },

    canDrop: () => isEditable && isEditing,

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [isEditable, isEditing, onDrop, index]);

  drop(ref);

  if (!isEditing) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'h-6 rounded-lg transition-all duration-200 my-1',
        isOver && canDrop
          ? 'border-2 border-blue-500 bg-blue-500/10 dark:bg-blue-500/20'
          : canDrop
            ? 'border-2 border-dashed border-zinc-300 dark:border-zinc-600 hover:border-blue-400 dark:hover:border-blue-500'
            : 'border-2 border-transparent'
      )}
    >
      {isOver && canDrop && (
        <div className="h-full flex items-center justify-center">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500 text-white text-xs font-medium shadow-md">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Drop here
          </div>
        </div>
      )}
    </div>
  );
};

export default DropZone;
