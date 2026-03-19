'use client';

import { useRef } from 'react';
import { useSlideStore } from '@/store/useSlideStore';
import { Slide } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useDrag, useDrop } from 'react-dnd';
import { MasterRecursiveComponent } from '../../editor/MasterRecursiveComponent';

interface DraggableSlidePreviewProps {
  slide: Slide;
  index: number;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
}

export const DraggableSlidePreview: React.FC<DraggableSlidePreviewProps> = ({
  slide,
  index,
  moveSlide,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { currentSlide, setCurrentSlide, currentTheme } = useSlideStore();

  const [{ isDragging }, drag] = useDrag({
    type: 'SLIDE',
    item: { index, type: 'SLIDE' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'SLIDE',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveSlide(item.index, index);
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  const handleContentChange = () => {};

  return (
    <div
      ref={ref}
      className={cn(
        'w-full rounded-lg cursor-pointer relative p-0 aspect-video transition-all duration-200',
        'border-2 shadow-sm hover:shadow-md',
        index === currentSlide 
          ? 'border-blue-500 dark:border-blue-400 shadow-blue-500/20 shadow-lg' 
          : 'border-transparent dark:border-zinc-700 dark:hover:border-zinc-600 hover:border-zinc-300',
        isDragging ? 'opacity-50 scale-95' : 'opacity-100'
      )}
      style={{
        backgroundColor: currentTheme.slideBackgroundColor,
      }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-full grow overflow-hidden scale-[0.35] origin-top-left w-[285%] h-[285%] pointer-events-none">
          <MasterRecursiveComponent
            content={slide.content}
            isPreview={true}
            slideId={slide.id}
            isEditable={false}
            onContentChange={handleContentChange}
          />
        </div>
      </div>
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
          {index + 1}
        </span>
      </div>
    </div>
  );
};
