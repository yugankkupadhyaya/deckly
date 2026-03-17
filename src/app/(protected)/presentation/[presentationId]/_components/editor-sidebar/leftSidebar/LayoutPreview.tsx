import React, { useEffect, useState } from 'react';
import { useSlideStore } from '@/store/useSlideStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { DraggableSlidePreview } from './DraggableSlidePreview';

const LayoutPreview = () => {
  const { getOrderedSlides, reOrderSlides, isEditing } = useSlideStore();
  const slides = getOrderedSlides();
  const [loading, setLoading] = useState(true);

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    if (isEditing) {
      reOrderSlides(dragIndex, hoverIndex);
    }
  };

  useEffect(() => {
    if (typeof window != 'undefined') setLoading(false);
  }, []);

  return (
    <div className="w-72 h-full fixed left-0 top-20 border-r dark:border-zinc-800 border-zinc-200 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-sm">
      <ScrollArea suppressHydrationWarning className="h-full w-full">
        {loading ? (
          <div className="w-full px-4 flex-col space-y-4">
            <Skeleton className="h-24 w-full rounded-lg"></Skeleton>
            <Skeleton className="h-24 w-full rounded-lg"></Skeleton>
            <Skeleton className="h-24 w-full rounded-lg"></Skeleton>
          </div>
        ) : (
          <div className="p-4 pb-32 space-y-4">
            <div className="flex items-center justify-between px-2 py-1.5">
              <h2 className="text-sm font-semibold dark:text-zinc-100 text-zinc-700">Slides</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 text-zinc-600" suppressHydrationWarning>
                {slides?.length}
              </span>
            </div>
            <div className="space-y-3">
              {slides.map((slide, index) => (
                <DraggableSlidePreview
                  key={slide.id || index}
                  slide={slide}
                  index={index}
                  moveSlide={moveSlide}
                />
              ))}
            </div>
            {slides.length === 0 && (
              <div className="text-center py-8 text-sm text-zinc-500 dark:text-zinc-400">
                {isEditing ? "No slides yet. Drag layouts here to get started." : "Enable Edit Mode to add slides"}
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LayoutPreview;
