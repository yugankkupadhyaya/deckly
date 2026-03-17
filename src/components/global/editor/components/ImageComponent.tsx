'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
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
  const [imgSrc, setImgSrc] = useState<string>('');
  const [hasError, setHasError] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      if (src && src.length > 0) {
        setImgSrc(src);
      } else {
        setImgSrc(getRandomImage());
      }
      setIsInitialized(true);
    }
  }, [src, isInitialized]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(getRandomImage());
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
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
          <UploadImage contentId={contentId} onContentChange={onContentChange} />
        </div>
      )}
    </div>
  );
};

export default CustomImage;
