'use client';

import { useRef } from 'react';
import { useSlideStore } from '../../../../../../store/useSlideStore';
import { Slide, ContentItem } from '../../../../../../lib/types';
import { cn } from '../../../../../../lib/utils';
import { useDrag } from 'react-dnd';
import { MasterRecursiveComponent } from './MasterRecursiveComponent';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import { Button } from '../../../../../../components/ui/button';
import { EllipsisVertical, Trash } from 'lucide-react';

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

  const currentSlide = useSlideStore((state) => state.currentSlide);
  const setCurrentSlide = useSlideStore((state) => state.setCurrentSlide);
  const currentTheme = useSlideStore((state) => state.currentTheme);
  const updateContentItem = useSlideStore((state) => state.updateContentItem);
  const isEditing = useSlideStore((state) => state.isEditing);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'SLIDE',
    item: { index, type: 'SLIDE' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => isEditable && isEditing,
  }), [isEditable, isEditing, index]);

  drag(ref);

  const handleContentChange = (
    contentId: string,
    newContent: string | string[] | string[][] | ContentItem[]
  ) => {
    if (!isEditable || !isEditing) return;

    updateContentItem(slide.id, contentId, newContent);
  };

  return (
    <div
      ref={ref}
      className={cn(
        'w-full rounded-xl relative p-0 min-h-[28rem] max-h-[45rem]',
        'shadow-lg transition-all duration-300',
        'flex flex-col',
        index === currentSlide 
          ? 'ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-zinc-900 scale-[1.01]' 
          : 'hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/20',
        slide.className,
        isDragging ? 'opacity-50 scale-95 shadow-none' : 'opacity-100'
      )}
      style={{
        backgroundColor: currentTheme.slideBackgroundColor,
        backgroundImage: currentTheme.gradientBackground,
      }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="h-full w-full grow overflow-hidden rounded-xl">
        <MasterRecursiveComponent
          content={slide.content}
          slideId={slide.id}
          isEditable={isEditing}
          onContentChange={handleContentChange}
        />

        {isEditable && isEditing && (
          <Popover>
            <PopoverTrigger asChild className="absolute top-3 left-3">
              <Button size="sm" variant="secondary" className="h-8 w-8 p-0 shadow-md hover:shadow-lg transition-shadow">
                <EllipsisVertical className="w-4 h-4" />
                <span className="sr-only">Slide Options</span>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-fit p-1.5">
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50" onClick={() => handleDelete(slide.id)}>
                  <Trash className="w-4 h-4" />
                  <span className="ml-1.5 text-xs">Delete</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
        
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-medium backdrop-blur-sm">
          {index + 1}
        </div>
      </div>
    </div>
  );
};
