'use client';
import React, { useCallback } from 'react';
import { ContentItem } from '../../../../../../lib/types';
import { motion } from 'framer-motion';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from '../../../../../../components/global/editor/components/Headings';
import Dropper from './Dropper';
import Paragraph from '../../../../../../components/global/editor/components/Paragraph';
import Table from '../../../../../../components/global/editor/components/Table';
import ColumnComponent from '../../../../../../components/global/editor/components/ColumnComponent';
import CustomImage from '../../../../../../components/global/editor/components/ImageComponent';
import List from '../../../../../../components/global/editor/components/List';
import { useSlideStore } from '../../../../../../store/useSlideStore';

type MasterRecursiveComponentProps = {
  content: ContentItem | ContentItem[];
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][] | ContentItem[]
  ) => void;

  isEditable?: boolean;
  slideId: string;
  index?: number;
  isPreview?: boolean;
};
type ContentRendererProps = {
  content: ContentItem;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][] | ContentItem[]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
};
export const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  isEditable,
  slideId,
  index,
  onContentChange,
  isPreview,
}) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      console.log('Typing: in handlechange ', e.target.value);
      onContentChange(content.id, e.target.value);
    },
    [content.id, onContentChange]
  );

  const commonProps = {
    placeholder: content.placeholder,
    value: content.content as string,
    onChange: handleChange,
    // isPreview: isPreview,
    isEditable: isEditable,
  };

  const animationProps = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  //wip complete types

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
    case 'heading2':
      return (
        <motion.div
          className="w-full h-full"
          variants={animationProps}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Heading2 {...commonProps} />
        </motion.div>
      );
    case 'heading3':
      return (
        <motion.div
          className="w-full h-full"
          variants={animationProps}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Heading3 {...commonProps} />
        </motion.div>
      );
    case 'heading4':
      return (
        <motion.div
          className="w-full h-full"
          variants={animationProps}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Heading4 {...commonProps} />
        </motion.div>
      );
    case 'title':
      return (
        <motion.div
          className="w-full h-full"
          variants={animationProps}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Title {...commonProps} />
        </motion.div>
      );
    case 'paragraph':
      return (
        <motion.div
          className="w-full h-full"
          variants={animationProps}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Paragraph {...commonProps} />
        </motion.div>
      );

    case 'table':
      return (
        <motion.div
          className="w-full h-full"
          variants={animationProps}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Table
            content={content.content as unknown as string[][]}
            onChange={(newData) => onContentChange(content.id, newData)}
            isPreview={isPreview}
            isEditable={isEditable}
          />
        </motion.div>
      );

    case 'resizable-column':
      if (Array.isArray(content.content)) {
        return (
          <motion.div
            className="w-full h-full"
            variants={animationProps}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <ColumnComponent
              content={content.content as ContentItem[]}
              className={content.className}
              onContentChange={onContentChange}
              slideId={slideId}
              isPreview={isPreview}
              isEditable={isEditable}
            />
          </motion.div>
        );
      }
      return null;

    case 'image':
      return (
        <motion.div
          className="w-full h-full"
          variants={animationProps}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <CustomImage
            src={content.content as string}
            alt={content.alt || 'image'}
            className={content.className}
            isPreview={isPreview}
            contentId={content.id}
            onContentChange={onContentChange}
            isEditable={isEditable}
          />
        </motion.div>
      );

    case 'list':
      return (
        <motion.div
          className="w-full h-full"
          variants={animationProps}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <List
            content={content.content as string[]}
            onChange={(newContent) => onContentChange(content.id, newContent)}
            isPreview={isPreview}
            isEditable={isEditable}
          />
        </motion.div>
      );

    case 'column':
      if (Array.isArray(content.content)) {
        return (
          <motion.div
            className="w-full h-full"
            variants={animationProps}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {content.content.length > 0 ? (
              (content.content as ContentItem[]).map((subitem: ContentItem, subIndex: number) => {
                return (
                  <React.Fragment key={subitem.id || subIndex}>
                    {!isPreview && !subitem.restrictToDrop && subIndex === 0 && isEditable && (
                      <Dropper index={0} parentId={content.id} slideId={slideId} />
                    )}
                    <MasterRecursiveComponent
                      content={subitem}
                      onContentChange={onContentChange}
                      slideId={slideId}
                      isEditable={isEditable}
                      index={subIndex}
                    />

                    {!isPreview && !subitem.restrictToDrop && isEditable && (
                      <Dropper index={subIndex + 1} parentId={content.id} slideId={slideId} />
                    )}
                  </React.Fragment>
                );
              })
            ) : isEditable ? (
              <Dropper index={0} parentId={content.id} slideId={slideId} />
            ) : null}
          </motion.div>
        );
      }
      return null;

    default:
      return null;
  }
};
ContentRenderer.displayName = 'ContentRenderer';

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> = ({
  content,
  onContentChange,
  slideId,
  index,
  isEditable = true,
  isPreview: propIsPreview,
}) => {
  const isEditing = useSlideStore((state) => state.isEditing);

  const isPreview = propIsPreview !== undefined ? propIsPreview : !isEditing;
  if (Array.isArray(content)) {
    return (
      <>
        {!isPreview && isEditable && content.length === 0 && (
          <Dropper index={0} parentId="" slideId={slideId} />
        )}
        {content.map((item, i) => (
          <React.Fragment key={item.id || i}>
            {!isPreview && isEditable && <Dropper index={i} parentId="" slideId={slideId} />}
            <MasterRecursiveComponent
              content={item}
              onContentChange={onContentChange}
              slideId={slideId}
              isEditable={isEditable}
              isPreview={isPreview}
              index={i}
            />
          </React.Fragment>
        ))}
        {!isPreview && isEditable && content.length > 0 && (
          <Dropper index={content.length} parentId="" slideId={slideId} />
        )}
      </>
    );
  }

  return (
    <ContentRenderer
      content={content}
      onContentChange={onContentChange}
      isPreview={isPreview}
      isEditable={isEditable}
      slideId={slideId}
      index={index}
    />
  );
};
MasterRecursiveComponent.displayName = 'MasterRecursiveComponent';
