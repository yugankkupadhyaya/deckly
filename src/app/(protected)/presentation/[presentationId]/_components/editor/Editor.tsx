import React, { useEffect, useRef, useState } from 'react';
import { useSlideStore } from '../../../../../../store/useSlideStore';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '../../../../../../components/ui/scroll-area';
import { LayoutSlides, Slide } from '../../../../../../lib/types';
import { v4 } from 'uuid';
import DropZone from './DropZone';
import { cn } from '../../../../../../lib/utils';
import { isDragging } from 'framer-motion';
import { useDrag } from 'react-dnd';

import ContentRenderer from './ContentRenderer';

type Props = {
  isEditable: boolean;
};

interface DraggableSlideProps {
  slide: Slide;
  index: number;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
  handleDelete: (id: string) => void;
  isEditable: boolean;
}

export const DraggableSlide: React.FC<DraggableSlideProps> = ({
  slide,
  index,
  moveSlide,
  handleDelete,
  isEditable,
}) => {
  const ref = useRef(null);
  const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } = useSlideStore();
  const [{ isDragging }, drag] = useDrag({
    type: 'SLIDE',
    item: { index, type: 'SLIDE' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditable,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'w-full rounded-lg relative p-0 min-h-[400px] max-h-[800px]',
        'shadow-xl transition-shadow duration-300',
        'flex flex-col',
        index === currentSlide ? 'ring-2 ring-blue-500 ring-offset-2' : '',
        slide.className,
        isDragging ? 'opacity-50' : 'opacity-100'
      )}
      style={{
        backgroundImage: currentTheme.gradientBackground,
      }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="h-full w-full grow overflow-hidden">
        <ContentRenderer />
      </div>
    </div>
  );
};

const Editor = ({ isEditable }: Props) => {
  const {
    getOrderedSlides,
    currentSlide,
    removeSlide,
    addSlideAtIndex,
    reOrderSlides,
    slides,
    project,
  } = useSlideStore();

  const slidesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [loading, setLoading] = useState(true);

  const orderedSlides = getOrderedSlides();

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    reOrderSlides(dragIndex, hoverIndex);
  };

  const handleDelete = (id: string) => {
    removeSlide(id);
  };

  const handleDrop = (
    item: {
      type: string;
      layoutType: string;
      component: LayoutSlides;
      index?: number;
    },
    dropIndex: number
  ) => {
    if (!isEditable) return;

    const moveSlide = (dragIndex: number, hoverIndex: number) => {
      reOrderSlides(dragIndex, hoverIndex);
    };

    if (item.type === 'layout') {
      addSlideAtIndex(
        {
          ...item.component,
          id: v4(),
          slideOrder: dropIndex,
        },
        dropIndex
      );
    } else if (item.type === 'SLIDE' && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  };

  useEffect(() => {
    if (slidesRefs.current[currentSlide]) {
      slidesRefs.current[currentSlide]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentSlide]);

  useEffect(() => {
    if (slides.length > 0) {
      setLoading(false);
    }
  }, [slides]);

  return (
    <div className="flex-1 flex flex-col h-full max-w-3xl mx-auto px-4 mb-20">
      {loading ? (
        <div className="w-full px-4 flex-col space-y-6">
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
          <Skeleton className="h-52 w-full" />
        </div>
      ) : (
        <ScrollArea className="flex-1 mt-8">
          <div className="px-4 pb-4 pt-2 space-y-4">
            {isEditable && <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />}

            {orderedSlides.map((slide, index) => (
              <React.Fragment key={slide.id || index}>
                <DraggableSlide
                  slide={slide}
                  index={index}
                  moveSlide={moveSlide}
                  handleDelete={handleDelete}
                  isEditable={isEditable}
                />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
