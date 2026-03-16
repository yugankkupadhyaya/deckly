'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSlideStore } from '../../../../../../store/useSlideStore';
import { ScrollArea } from '../../../../../../components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { LayoutSlides } from '../../../../../../lib/types';
import DropZone from './DropZone';
import { DraggableSlide } from './DraggableSlide';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  isEditable: boolean;
};

const Editor = ({ isEditable }: Props) => {
  const { getOrderedSlides, reOrderSlides, removeSlide, addSlideAtIndex, slides, currentSlide } =
    useSlideStore();

  const orderedSlides = getOrderedSlides();

  const slidesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [loading, setLoading] = useState(true);

  // Move slide
  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    reOrderSlides(dragIndex, hoverIndex);
  };

  // Delete slide
  const handleDelete = (id: string) => {
    if (!isEditable) return;
    removeSlide(id);
  };

  // Handle drop from layout panel OR slide drag
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

    // Dropping new layout
    if (item.type === 'layout') {
      addSlideAtIndex(
        {
          ...item.component,
          id: uuidv4(),
          slideOrder: dropIndex,
        },
        dropIndex
      );
    }

    // Reordering slides
    if (item.type === 'SLIDE' && item.index !== undefined) {
      moveSlide(item.index, dropIndex);
    }
  }; // Skeleton loading
  useEffect(() => {
    if (slides.length > 0) {
      setLoading(false);
    }
  }, [slides]);

  // Scroll current slide into view
  useEffect(() => {
    if (slidesRefs.current[currentSlide]) {
      slidesRefs.current[currentSlide]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentSlide]);

 
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
            {/* Initial drop zone */}
            {isEditable && <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />}

            {orderedSlides.map((slide, index) => (
              <React.Fragment key={slide.id}>
                {/* Slide container for scrolling */}
                <div
                  ref={(el) => {
                    slidesRefs.current[index] = el;
                  }}
                >
                  <DraggableSlide
                    slide={slide}
                    index={index}
                    moveSlide={moveSlide}
                    handleDelete={handleDelete}
                    isEditable={isEditable}
                  />
                </div>

                {/* Drop zone between slides */}
                {isEditable && (
                  <DropZone index={index + 1} onDrop={handleDrop} isEditable={isEditable} />
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
