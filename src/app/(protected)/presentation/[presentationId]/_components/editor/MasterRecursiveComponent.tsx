import React from 'react';
import { ContentItem } from '../../../../../../lib/types';
import { motion } from 'framer-motion';
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
  ({ content, isPreview, isEditable, slideId, index }) => {


    const commonProps = {
      placeholder: content.placeholder,
      value:content.content as string,
      onChange: handleChange,
      isPreview:isPreview,
    }


    switch (content.type) {
  
      case 'heading1':
        return <motion.div className='w-full h-full'>
<Heading1 {...}/>

        </motion.div>
}

  }
);
export default ContentRenderer;
