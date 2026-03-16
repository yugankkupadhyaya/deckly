'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '../../../../lib/utils';
import { useSlideStore } from '../../../../store/useSlideStore';

interface ParagraphProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  styles?: React.CSSProperties;
  isPreview?: boolean;
}

const Paragraph = React.forwardRef<HTMLTextAreaElement, ParagraphProps>(
  ({ children, styles, className, isPreview = false, ...props }, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { currentTheme } = useSlideStore();

    useEffect(() => {
      const textarea = textAreaRef.current;

      if (textarea && !isPreview) {
        const adjustHeight = () => {
          textarea.style.height = '0';
          textarea.style.height = `${textarea.scrollHeight}px`;
        };

        textarea.addEventListener('input', adjustHeight);
        adjustHeight();

        return () => textarea.removeEventListener('input', adjustHeight);
      }
    }, [isPreview]);

    const previewClassName = isPreview ? 'text-xs' : '';

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
        readOnly={isPreview}
        className={cn(
          'w-full bg-transparent font-normal placeholder:text-gray-300 focus:outline-none resize-none overflow-hidden leading-tight',
          'text-lg',
          previewClassName,
          className
        )}
        style={{
          padding: 0,
          margin: 0,
          color: currentTheme.fontColor,
          fontFamily: currentTheme.fontFamily,
          boxSizing: 'content-box',
          lineHeight: '1.2em',
          minHeight: '1.2em',
          ...styles,
        }}
      >
        {children}
      </textarea>
    );
  }
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
