import { ContentItem } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../../../ui/resizable';
import { cn } from '../../../../lib/utils';
import { MasterRecursiveComponent } from '../../../../app/(protected)/presentation/[presentationId]/_components/editor/MasterRecursiveComponent';
import Paragraph from './Paragraph';

type Props = {
  content: ContentItem[];
  className?: string;
  isPreview?: boolean;
  slideId: string;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][] | ContentItem[]
  ) => void;
  isEditable?: boolean;
};

const ColumnComponent = ({
  content,
  className,
  isPreview,
  slideId,
  onContentChange,
  isEditable,
}: Props) => {
  const [columns, setColumns] = useState<ContentItem[]>([]);
  const createDefaultColumns = (count: number) => {
    return Array(count)
      .fill(null)
      .map(() => {
        return {
          id: uuidv4(),
          type: 'paragraph' as const,
          name: 'Paragraph',
          content: '',
          placeholder: 'start typing..',
        };
      });
  };
  useEffect(() => {
    if (content.length === 0) setColumns(createDefaultColumns(2));
    else {
      setColumns(content);
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <ResizablePanelGroup
        direction="horizontal"
        className={cn('h-full w-full flex', !isEditable && '!border-0', className)}
      >
        {columns.map((item, index) => (
          <React.Fragment key={item.id}>
            <ResizablePanel minSize={20} defaultSize={100}>
              <div className={cn('h-full w-full', item.className)}>
                <MasterRecursiveComponent
                  content={item}
                  isPreview={isPreview}
                  onContentChange={onContentChange}
                  slideId={slideId}
                  isEditable={isEditable}
                ></MasterRecursiveComponent>
              </div>
            </ResizablePanel>
            {index < columns.length - 1 && isEditable && (
              <ResizableHandle withHandle={!isPreview} />
            )}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default ColumnComponent;
function uuidv4(): any {
  throw new Error('Function not implemented.');
}
