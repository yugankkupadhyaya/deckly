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
  const reOrderSlides = useSlideStore((state) => state.reOrderSlides);
  const removeSlide = useSlideStore((state) => state.removeSlide);
  const addSlideAtIndex = useSlideStore((state) => state.addSlideAtIndex);
  const slides = useSlideStore((state) => state.slides);
  const currentSlide = useSlideStore((state) => state.currentSlide);
  const isEditing = useSlideStore((state) => state.isEditing);
  console.log(isEditable);
  const orderedSlides = React.useMemo(() => {
    return [...slides].sort((a, b) => a.slideOrder - b.slideOrder);
  }, [slides]);
  const slidesRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [loading, setLoading] = useState(true);
  console.log('🔥 EDITOR RENDER');
  // Move slide
  const moveSlide = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      if (isEditing) {
        reOrderSlides(dragIndex, hoverIndex);
      }
    },
    [isEditing, reOrderSlides]
  );

  // Delete slide
  const handleDelete = React.useCallback(
    (id: string) => {
      if (!isEditable || !isEditing) return;
      removeSlide(id);
    },
    [isEditable, isEditing, removeSlide]
  );

  // Handle drop from layout panel OR slide drag
  const handleDrop = React.useCallback(
    (
      item: {
        type: string;
        layoutType: string;
        component: LayoutSlides;
        index?: number;
      },
      dropIndex: number
    ) => {
      if (!isEditable || !isEditing) return;

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
    },
    [isEditable, isEditing, addSlideAtIndex, moveSlide]
  ); // Skeleton loading
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
    <div className="flex-1 flex flex-col h-full max-w-4xl mx-auto px-4 pb-20">
      {loading ? (
        <div className="w-full px-4 flex-col space-y-6 mt-8">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      ) : (
        <ScrollArea className="flex-1 mt-6">
          <div className="px-2 pb-6 pt-2 space-y-4">
            {/* Initial drop zone */}
            {isEditable && isEditing && (
              <DropZone index={0} onDrop={handleDrop} isEditable={isEditable} />
            )}

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
                {isEditable && isEditing && (
                  <DropZone index={index + 1} onDrop={handleDrop} isEditable={isEditable} />
                )}
              </React.Fragment>
            ))}

            {orderedSlides.length === 0 && isEditable && isEditing && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                  <svg
                    className="w-10 h-10 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  No slides yet
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Drag layouts from the left panel to create your first slide
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default Editor;
