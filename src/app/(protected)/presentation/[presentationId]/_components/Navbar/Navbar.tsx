'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../../../../components/ui/button';
import { OutlineCard, Theme } from '../../../../../../lib/types';
import { HomeIcon, Play, Share } from 'lucide-react';
import { showSuccessToast } from '../../../../../../lib/toast';

type Props = {
  presentationId: string;
  theme: Theme;
};

const Navbar = ({ presentationId, theme }: Props) => {
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/share/${presentationId}`);
    showSuccessToast('Link Copied to your clipboard!!');
  };

  return (
    <nav
      className="fixed top-0 left-0 ring-0 z-50 w-full h-20 flex justify-between items-center py-4 px-7 border-b"
      style={{
        backgroundColor: theme.navbarColor || theme.backgroundColor,
        color: theme.accentColor,
      }}
    >
      <Link href={'/dashboard'} passHref>
        <Button
          variant={'outline'}
          className="flex items-center gap-2"
          style={{
            backgroundColor: theme.backgroundColor,
          }}
        >
          <HomeIcon className="w-4 h-4"></HomeIcon>
          <span className="hidden sm:inline">Return Home</span>
        </Button>
      </Link>
      <Link
        href={'/presentation/template-market'}
        className="text-lg font-semibold hidden sm:block"
      >
        Presentation Editor
      </Link>
      <div className="flex items-center gap-4">
        <Button
          className=""
          style={{
            backgroundColor: theme.backgroundColor,
          }}
          variant={'outline'}
          onClick={handleCopy}
        >
          <Share className="w-4 h-4"></Share>
        </Button>
        <Button
          variant={'default'}
          className="flex items-center gap-2"
          onClick={() => setIsPresentationMode(true)}
        >
          <Play className="h-4 w-4"></Play>
          <span className="hidden sm:inline">Present</span>
        </Button>
      </div>

      {/* WIP: Add presentation mode */}
      {/* {isPresentationMode && <PresentationMode />} */}
    </nav>
  );
};

export default Navbar;
