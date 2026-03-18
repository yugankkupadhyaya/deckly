'use client';

import React, { useRef } from 'react';
import { cn } from '../../../../lib/utils';
import { useSlideStore } from '../../../../store/useSlideStore';
import { useAutoResizeTextarea } from '../../../../hooks/use-auto-resize-textarea';

interface ParagraphProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  styles?: React.CSSProperties;
  isPreview?: boolean;
  isEditable?: boolean;
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

const Paragraph = React.forwardRef<HTMLTextAreaElement, ParagraphProps>(
  ({ value, styles, className, isPreview = false, isEditable = true, ...props }, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { currentTheme, isEditing: globalIsEditing } = useSlideStore();

    const isEditableFinal = isEditable && globalIsEditing;
    const shouldAutoResize = !isPreview && isEditableFinal;

    useAutoResizeTextarea(textAreaRef, typeof value === 'string' ? value : String(value ?? ''), shouldAutoResize);

    const editableClassName =
      !isPreview && isEditableFinal
        ? 'focus:bg-blue-50 dark:focus:bg-blue-950/30 focus:ring-2 focus:ring-blue-500/50 rounded-md transition-all cursor-text'
        : '';

    return (
      <textarea
        {...props}
        ref={(el) => {
          textAreaRef.current = el;

          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = el;
          }
        }}
        value={value}
        readOnly={!shouldAutoResize}
        className={cn(
          'font-normal placeholder:text-gray-300 dark:placeholder:text-gray-600 leading-tight text-lg',
          editableClassName,
          className
        )}
        style={{
          ...baseEditableStyles,
          padding: shouldAutoResize ? '4px 8px' : 0,
          margin: 0,
          color: currentTheme.fontColor,
          fontFamily: currentTheme.fontFamily,
          ...styles,
        }}
      />
    );
  }
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
