'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '../../../../lib/utils';
import { useSlideStore } from '../../../../store/useSlideStore';

interface HeadingProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  styles?: React.CSSProperties;
  isPreview?: boolean;
}

const createHeading = (displayName: string, defaultClassName: string) => {
  const Heading = React.forwardRef<HTMLTextAreaElement, HeadingProps>(
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
            defaultClassName,
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

  Heading.displayName = displayName;

  return Heading;
};

const Heading1 = createHeading('Heading1', 'text-4xl');
const Heading2 = createHeading('Heading2', 'text-3xl');
const Heading3 = createHeading('Heading3', 'text-2xl');
const Heading4 = createHeading('Heading4', 'text-xl');
const Title = createHeading('Title', 'text-5xl');
export { Heading1, Heading2, Heading3, Heading4, Title };
