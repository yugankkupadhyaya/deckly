import React, { useEffect, useRef, useState } from 'react';
import { useSlideStore } from '../../../../../../store/useSlideStore';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '../../../../../../components/ui/scroll-area';
import { LayoutSlides } from '../../../../../../lib/types';
import { v4 } from 'uuid';
import DropZone from './DropZone';

type Props = {
  isEditable: boolean;
};

const Editor = ({ isEditable }: Props) => {
  const {
    getOrderSlides,
    currentSlide,
    removeSlide,
    addSlideAtIndex,
    reOrderSlides,
    slides,
    project,
  } = useSlideStore();

  const slidesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [loading, setLoading] = useState(true);

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
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
