'use client';

import React, { useCallback, useRef } from 'react';
import { cn } from '../../../../lib/utils';
import { useSlideStore } from '../../../../store/useSlideStore';
import { useAutoResizeTextarea } from '../../../../hooks/use-auto-resize-textarea';

interface ListProps {
  content: string[];
  onChange: (newContent: string[]) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  className?: string;
}

const baseEditableStyles = {
  width: '100%',
  background: 'transparent',
  resize: 'none' as const,
  overflow: 'hidden',
  outline: 'none',
  boxSizing: 'border-box' as const,
  lineHeight: '1.2em',
  minHeight: '1.2em',
};

interface ListItemProps {
  value: string;
  onChange: (newValue: string) => void;
  isEditable: boolean;
  canDelete: boolean;
  onDelete: () => void;
  color: string;
  fontFamily: string;
}

const ListItem: React.FC<ListItemProps> = ({
  value,
  onChange,
  isEditable,
  canDelete,
  onDelete,
  color,
  fontFamily,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutoResizeTextarea(textAreaRef, value, isEditable);

  return (
    <li className="flex items-start gap-2 group">
      <textarea
        ref={textAreaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={!isEditable}
        className={cn(
          'font-normal placeholder:text-gray-300 focus:outline-none leading-tight text-lg',
          isEditable && 'focus:bg-blue-50 dark:focus:bg-blue-950/30 focus:ring-2 focus:ring-blue-500/50 rounded-md transition-all cursor-text'
        )}
        style={{
          ...baseEditableStyles,
          padding: isEditable ? '4px 8px' : 0,
          margin: 0,
          color,
          fontFamily,
        }}
      />
      {isEditable && canDelete && (
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-sm px-1"
        >
          ×
        </button>
      )}
    </li>
  );
};

const List: React.FC<ListProps> = ({
  content,
  onChange,
  isPreview = false,
  isEditable = true,
  className,
}) => {
  const { currentTheme } = useSlideStore();
  const isEditableFinal = isEditable && !isPreview;

  const handleItemChange = useCallback(
    (index: number, newValue: string) => {
      const newContent = [...content];
      newContent[index] = newValue;
      onChange(newContent);
    },
    [content, onChange]
  );

  const handleAddItem = useCallback(() => {
    onChange([...content, 'New point']);
  }, [content, onChange]);

  const handleRemoveItem = useCallback(
    (index: number) => {
      if (content.length > 1) {
        const newContent = content.filter((_, i) => i !== index);
        onChange(newContent);
      }
    },
    [content, onChange]
  );

  return (
    <div className={cn('space-y-2', className)}>
      <ul
        className="list-disc list-inside space-y-2"
        style={{ color: currentTheme.fontColor, fontFamily: currentTheme.fontFamily }}
      >
        {content.map((item, index) => (
          <ListItem
            key={index}
            value={item}
            onChange={(newValue) => handleItemChange(index, newValue)}
            isEditable={isEditableFinal}
            canDelete={content.length > 1}
            onDelete={() => handleRemoveItem(index)}
            color={currentTheme.fontColor}
            fontFamily={currentTheme.fontFamily}
          />
        ))}
      </ul>
      {isEditableFinal && (
        <button
          onClick={handleAddItem}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          + Add item
        </button>
      )}
    </div>
  );
};

export default List;
