'use client';
import React, { useCallback } from 'react';
import { ContentItem } from '../../../../../../lib/types';
import { animate, motion } from 'framer-motion';
import { Heading1 } from '../../../../../../components/global/editor/components/Headings';

type MasterRecursiveComponentProps = {
  content: ContentItem;
  onContentChange: (contentId: string, newContent: string | string[] | string[][]) => void;

  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
};

const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, isPreview, isEditable, slideId, index, onContentChange }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );
    const commonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
      onChange: handleChange,
      isPreview: isPreview,
    };

    const animationProps = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    switch (content.type) {
      case 'heading1':
        return (
          <motion.div
            className="w-full h-full"
            variants={animationProps}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Heading1 {...commonProps} />
          </motion.div>
        );
    }
  }
);
export default ContentRenderer;
