import { ContentItem } from '@/lib/types';
import React from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '../../../ui/resizable';
import { cn } from '../../../../lib/utils';
import { MasterRecursiveComponent } from '../../../../app/(protected)/presentation/[presentationId]/_components/editor/MasterRecursiveComponent';

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
  return (
    <div className="relative w-full h-full">
      <ResizablePanelGroup
        className={cn('h-full w-full flex', !isEditable && '!border-0', className)}
      >
        {content.map((item, index) => (
          <React.Fragment key={item.id}>
            <ResizablePanel minSize={20} defaultSize={100}>
              <div className={cn('h-full w-full', item.className)}>
                <MasterRecursiveComponent
                  content={item}
                  isPreview={isPreview}
                  onContentChange={onContentChange}
                  slideId={slideId}
                  isEditable={isEditable}
                />
              </div>
            </ResizablePanel>
            {index < content.length - 1 && isEditable && (
              <ResizableHandle withHandle={!isPreview} />
            )}
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  );
};

export default ColumnComponent;

