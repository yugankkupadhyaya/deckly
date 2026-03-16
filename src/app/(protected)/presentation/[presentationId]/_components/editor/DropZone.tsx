import React, { useRef } from 'react';
import { LayoutSlides } from '../../../../../../lib/types';
import { cn } from '../../../../../../lib/utils';
import { useDrop } from 'react-dnd';

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

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ['SLIDE', 'Layout'],

    drop: (item: { type: string; layoutType: string; component: LayoutSlides; index?: number }) => {
      onDrop(item, index);
    },

    canDrop: () => isEditable,

    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  drop(ref);

  return (
    <div
      ref={ref}
      className={cn(
        'h-4 rounded-md transition-all duration-200',
        isOver && canDrop ? 'border-green-500 bg-green-100' : 'border-gray-300',
        canDrop ? 'border-blue-300' : ''
      )}
    >
      {isOver && canDrop && (
        <div className="h-full flex items-center justify-center text-green-600">Drop here </div>
      )}
    </div>
  );
};

export default DropZone;
