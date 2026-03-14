'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSlideStore } from '../../../../../../store/useSlideStore';
import { ScrollArea } from '../../../../../../components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Slide, LayoutSlides, ContentItem } from '../../../../../../lib/types';
import DropZone from './DropZone';
import { v4 as uuidv4 } from 'uuid';
import { DraggableSlide } from './DraggableSlide';

type Props = {
  isEditable: boolean;
};

const Editor = ({ isEditable }: Props) => {
  const { getOrderedSlides, reOrderSlides, removeSlide, addSlideAtIndex, slides, currentSlide } =
    useSlideStore();

  const orderedSlides = getOrderedSlides();

  const slidesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [loading, setLoading] = useState(true);

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    reOrderSlides(dragIndex, hoverIndex);
  };

  const handleDelete = (id: string) => {
    if (!isEditable) return;
    removeSlide(id);
  };

  type DropItem = {
    type: string;
    layoutType: string;
    component: LayoutSlides;
    index?: number;
  };

  const handleDrop = (item: DropItem, dropIndex: number) => {
    if (!isEditable) return;

    if (item.type === 'layout') {
      const newContent: ContentItem = {
        id: uuidv4(),
        name: 'New Content',
        type: 'text',
        content:
          typeof item.component === 'string' ? item.component : JSON.stringify(item.component),
      };

      const newSlide: Slide = {
        id: uuidv4(),
        content: newContent,
        className: '',
        slideName: 'New Slide',
        type: 'default',
        slideOrder: dropIndex,
      };

      addSlideAtIndex(newSlide, dropIndex);
    }

    if (item.type === 'SLIDE' && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  };

  // Scroll active slide into view
  useEffect(() => {
    if (slidesRefs.current[currentSlide]) {
      slidesRefs.current[currentSlide]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentSlide]);

  // Loading skeleton logic
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
              <div key={slide.id} ref={(el) => { slidesRefs.current[index] = el; }}>
                <DraggableSlide
                  slide={slide}
                  index={index}
                  moveSlide={moveSlide}
                  handleDelete={handleDelete}
                  isEditable={isEditable}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
