'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { containerVariants } from '@/lib/constants';
import UploadImage from './UploadImage';
import { getRandomImage } from '../../../../lib/images';

type Props = {
  src: string;
  alt: string;
  className?: string;
  isPreview?: boolean;
  contentId: string;
  onContentChange: (contentId: string, newContent: string | string[] | string[][]) => void;
  isEditable?: boolean;
};

const CustomImage = ({
  src,
  alt,
  className,
  isPreview,
  contentId,
  onContentChange,
  isEditable,
}: Props) => {
  const [imgSrc, setImgSrc] = useState(src && src.length > 0 ? src : getRandomImage());
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      const fallback = getRandomImage();
      setImgSrc(fallback);
    }
  };

  return (
    <div className="relative group w-full h-full rounded-lg overflow-hidden">
      <Image
        src={hasError ? getRandomImage() : imgSrc}
        width={isPreview ? 48 : 800}
        height={isPreview ? 48 : 800}
        alt={alt || 'image'}
        className={`object-cover w-full h-full rounded-lg ${className}`}
        onError={handleError}
        unoptimized
      />
      {!isPreview && isEditable && (
        <div className="absolute top-0 left-0 hidden group-hover::block">
          <UploadImage contentId={contentId} onContentChange={onContentChange} />
        </div>
      )}
    </div>
  );
};

export default CustomImage;
