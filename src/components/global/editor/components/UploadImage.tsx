'use client';
import React from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
type Props = {
  contentId: string;
  onContentChange: (contentId: string, newContent: string | string[] | string[][]) => void;
};

const UploadImage = ({ contentId, onContentChange }: Props) => {
  const handleChangeEvent = (e: any) => {
    const url = e?.cdnUrl || e?.fileInfo?.cdnUrl || e?.successEntries?.[0]?.cdnUrl;

    if (!url) {
      console.error('Upload failed: No CDN URL found', e);
      return;
    }

    console.log('Uploading image URL:', url);

    onContentChange(contentId, url);
  };

  return (
    <div>
      <FileUploaderRegular
        sourceList="local, url ,dropbox"
        classNameUploader="uc-light"
        pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!}
        multiple={false}
        onFileUploadSuccess={handleChangeEvent}
        maxLocalFileSizeBytes={1000000}
        onCommonUploadSuccess={(e) =>
          console.log(
            'Uploaded files URL list',
            e.successEntries.map((entry) => entry.cdnUrl)
          )
        }
      />
    </div>
  );
};

export default UploadImage;
