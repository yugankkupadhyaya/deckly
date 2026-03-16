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

  const { currentSlide, setCurrentSlide, currentTheme, updateContentItem } = useSlideStore();

  const [{ isDragging }, drag] = useDrag({
    type: 'SLIDE',
    item: { index, type: 'SLIDE' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditable,
  });

  drag(ref);

  const handleContentChange = (
    contentId: string,
    newContent: string | string[] | string[][] | ContentItem[]
  ) => {
    if (!isEditable) return;

    updateContentItem(slide.id, contentId, newContent);
  };

  return (
    <div
      ref={ref}
      className={cn(
        'w-full rounded-lg relative p-0 min-h-100 max-h-200',
        'shadow-xl transition-shadow duration-300',
        'flex flex-col',
        index === currentSlide ? 'ring-2 ring-blue-500 ring-offset-2' : '',
        slide.className,
        isDragging ? 'opacity-50' : 'opacity-100'
      )}
      style={{
        backgroundColor: currentTheme.slideBackgroundColor,
        backgroundImage: currentTheme.gradientBackground,
      }}
      onClick={() => setCurrentSlide(index)}
    >
      <div className="h-full w-full grow overflow-hidden">
        <MasterRecursiveComponent
          content={slide.content}
          isPreview={false}
          slideId={slide.id}
          isEditable={isEditable}
          onContentChange={handleContentChange}
        />

        {isEditable && (
          <Popover>
            <PopoverTrigger asChild className="absolute top-2 left-2">
              <Button size="sm" variant="outline">
                <EllipsisVertical className="w-5 h-5" />
                <span className="sr-only">Slide Options</span>
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-fit p-0">
              <div className="flex space-x-2">
                <Button variant="ghost" onClick={() => handleDelete(slide.id)}>
                  <Trash className="w-5 h-5 text-red-500" />
                  <span className="sr-only">Delete slide</span>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};
