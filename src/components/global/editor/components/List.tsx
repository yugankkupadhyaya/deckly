'use client';

import React, { useCallback } from 'react';
import { cn } from '../../../../lib/utils';
import { useSlideStore } from '../../../../store/useSlideStore';

interface ListProps {
  content: string[];
  onChange: (newContent: string[]) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  className?: string;
}

const List: React.FC<ListProps> = ({
  content,
  onChange,
  isPreview = false,
  isEditable = true,
  className,
}) => {
  const { currentTheme } = useSlideStore();

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

  if (isPreview) {
    return (
      <ul 
        className={cn('list-disc list-inside space-y-1', className)}
        style={{ color: currentTheme.fontColor, fontFamily: currentTheme.fontFamily }}
      >
        {content.map((item, index) => (
          <li key={index} className="text-lg">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      <ul 
        className="list-disc list-inside space-y-2"
        style={{ color: currentTheme.fontColor, fontFamily: currentTheme.fontFamily }}
      >
        {content.map((item, index) => (
          <li key={index} className="flex items-start gap-2 group">
            <textarea
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              className={cn(
                'w-full bg-transparent font-normal placeholder:text-gray-300 focus:outline-none resize-none overflow-hidden',
                'text-lg leading-tight min-h-[1.5em]'
              )}
              style={{
                padding: 0,
                margin: 0,
                color: currentTheme.fontColor,
                fontFamily: currentTheme.fontFamily,
              }}
              rows={1}
            />
            {isEditable && content.length > 1 && (
              <button
                onClick={() => handleRemoveItem(index)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-sm px-1"
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
      {isEditable && (
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
