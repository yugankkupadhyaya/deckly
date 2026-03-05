import React, { useEffect, useState } from 'react';
import { useSlideStore } from '../../../../../../../store/useSlideStore';
import { ScrollArea } from '../../../../../../../components/ui/scroll-area';
import { Divide } from 'lucide-react';
import { Skeleton } from '../../../../../../../components/ui/skeleton';
import { Slide } from '../../../../../../../lib/types';

type Props = {};

const LayoutPreview = (props: Props) => {
  const { getOrderedSlides, reOrderSlides } = useSlideStore();
  const slides = getOrderedSlides();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window != 'undefined') setLoading(false);
  }, []);

  return (
    <div className="w-64 h-full fixed left-0 to-20 border-r overflow-y-auto">
      <ScrollArea suppressHydrationWarning className="h-full w-full">
        {loading ? (
          <div className="w-full px-4 flex-col space-y-6">
            <Skeleton className="h-20 w-full"></Skeleton>
            <Skeleton className="h-20 w-full"></Skeleton>
            <Skeleton className="h-20 w-full"></Skeleton>
          </div>
        ) : (
          <div className="p-4 pb-32 space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-medium dark:text-gray-100 text-gray-500">Slides</h2>
              <span className="text-xs dark:text-gray-200 text-gray-400" suppressHydrationWarning>
                {slides?.length}slides
              </span>
            </div>
            {/* WIP:Add the draggable slide preview after you build the editor  */}
            {/* {slides.map((slide, index) => (
                <DraggableSlidePreview
                  key={slide.id || index}
                  slide={slide}
                  index={index}
                  moveSlide={moveSlide}
                />
              ))} */}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default LayoutPreview;
