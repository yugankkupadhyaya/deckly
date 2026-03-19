'use client';

import React from 'react';
import { useDrag } from 'react-dnd';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContentItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSlideStore } from '@/store/useSlideStore';
import { 
  Type, 
  Heading1, 
  Image as ImageIcon, 
  List, 
  Table as TableIcon,
  LayoutTemplate,
  Columns3,
  Quote
} from 'lucide-react';

interface DraggableItemProps {
  type: string;
  label: string;
  icon: React.ReactNode;
  component: ContentItem;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ type, label, icon, component }) => {
  const { isEditing } = useSlideStore();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CONTENT_ITEM',
    item: { type: 'component', componentType: type, label, component },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: isEditing,
  }));

  return (
    <div
      ref={drag as unknown as React.RefObject<HTMLDivElement>}
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg border transition-all duration-200',
        isEditing 
          ? 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 cursor-grab hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md'
          : 'border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 cursor-not-allowed opacity-50',
        isDragging && isEditing && 'opacity-50 cursor-grabbing'
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-md flex items-center justify-center",
        isEditing ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-sm font-medium",
        isEditing ? "text-zinc-700 dark:text-zinc-300" : "text-zinc-400"
      )}>{label}</span>
    </div>
  );
};

const componentTemplates: DraggableItemProps[] = [
  {
    type: 'title',
    label: 'Title',
    icon: <Heading1 className="w-4 h-4" />,
    component: {
      id: '',
      type: 'title',
      name: 'Title',
      content: 'Add your title here',
      placeholder: 'Enter title...',
    },
  },
  {
    type: 'heading1',
    label: 'Heading 1',
    icon: <Heading1 className="w-4 h-4" />,
    component: {
      id: '',
      type: 'heading1',
      name: 'Heading 1',
      content: 'Heading 1',
      placeholder: 'Enter heading...',
    },
  },
  {
    type: 'heading2',
    label: 'Heading 2',
    icon: <Type className="w-4 h-4" />,
    component: {
      id: '',
      type: 'heading2',
      name: 'Heading 2',
      content: 'Heading 2',
      placeholder: 'Enter heading...',
    },
  },
  {
    type: 'paragraph',
    label: 'Paragraph',
    icon: <Type className="w-4 h-4" />,
    component: {
      id: '',
      type: 'paragraph',
      name: 'Paragraph',
      content: 'Add your paragraph text here. Click to edit.',
      placeholder: 'Enter text...',
    },
  },
  {
    type: 'list',
    label: 'List',
    icon: <List className="w-4 h-4" />,
    component: {
      id: '',
      type: 'list',
      name: 'List',
      content: ['Item 1', 'Item 2', 'Item 3'],
      placeholder: 'Enter list item...',
    },
  },
  {
    type: 'image',
    label: 'Image',
    icon: <ImageIcon className="w-4 h-4" />,
    component: {
      id: '',
      type: 'image',
      name: 'Image',
      content: '',
      alt: 'Image description',
    },
  },
  {
    type: 'table',
    label: 'Table',
    icon: <TableIcon className="w-4 h-4" />,
    component: {
      id: '',
      type: 'table',
      name: 'Table',
      content: [['Header 1', 'Header 2'], ['Cell 1', 'Cell 2']],
    },
  },
  {
    type: 'column',
    label: 'Columns',
    icon: <Columns3 className="w-4 h-4" />,
    component: {
      id: '',
      type: 'column',
      name: 'Columns',
      content: [],
      restrictToDrop: false,
    },
  },
  {
    type: 'quote',
    label: 'Quote',
    icon: <Quote className="w-4 h-4" />,
    component: {
      id: '',
      type: 'paragraph',
      name: 'Quote',
      content: '"Your quote here"',
      placeholder: 'Enter quote...',
    },
  },
];

const ComponentsPanel = () => {
  const { isEditing } = useSlideStore();

  return (
    <div className="w-64 h-full fixed right-0 top-16 border-l dark:border-zinc-800 border-zinc-200 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-sm">
      <ScrollArea suppressHydrationWarning className="h-full w-full">
        <div className="p-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-sm font-semibold dark:text-zinc-100 text-zinc-700">Components</h2>
          </div>

          {!isEditing && (
            <div className="text-center py-4 px-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Enable <strong>Edit Mode</strong> to add and modify components
              </p>
            </div>
          )}
          
          {isEditing && (
            <>
              <div className="space-y-2">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider px-2">
                  Basic
                </p>
                {componentTemplates.slice(0, 4).map((item) => (
                  <DraggableItem
                    key={item.type}
                    type={item.type}
                    label={item.label}
                    icon={item.icon}
                    component={item.component}
                  />
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider px-2">
                  Advanced
                </p>
                {componentTemplates.slice(4).map((item) => (
                  <DraggableItem
                    key={item.type}
                    type={item.type}
                    label={item.label}
                    icon={item.icon}
                    component={item.component}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ComponentsPanel;
