'use client';

import React from 'react';
import { ContentItem } from '../../../../../../lib/types';
import { useSlideStore } from '../../../../../../store/useSlideStore';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

type DropperProps = {
  index: number;
  parentId: string;
  slideId: string;
};

const Dropper = ({ index, parentId, slideId }: DropperProps) => {
  const { addComponentInSlide } = useSlideStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'CONTENT_ITEM',

    drop: (item: {
      type: string;
      componentType: string;
      label: string;
      component: ContentItem;
    }) => {
      if (item.type === 'component') {
        addComponentInSlide(slideId, { ...item.component, id: uuidv4() }, parentId, index);
      }
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={`h-6 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400 transition ${
        isOver ? 'bg-blue-100 border-blue-400' : ''
      }`}
    >
      Drop here
    </div>
  );
};

export default Dropper;
