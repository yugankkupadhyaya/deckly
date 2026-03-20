'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../../../../../../components/ui/button';
import { OutlineCard, Theme } from '../../../../../../lib/types';
import { HomeIcon, Play, Share, Edit3, Eye } from 'lucide-react';
import { showSuccessToast } from '../../../../../../lib/toast';
import { useSlideStore } from '../../../../../../store/useSlideStore';
import PresentationMode from './PresentationMode';

type Props = {
  presentationId: string;
  theme: Theme;
  mode: 'edit' | 'present';
  setMode: (mode: 'edit' | 'present') => void;
};
const Navbar = ({ presentationId, theme, setMode, mode }: Props) => {
  const { isEditing, toggleEditing } = useSlideStore();

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/share/${presentationId}`);
    showSuccessToast('Link Copied to your clipboard!!');
  };

  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full h-16 flex justify-between items-center px-4 md:px-6 border-b backdrop-blur-md"
      style={{
        backgroundColor: theme.navbarColor
          ? `${theme.navbarColor}ee`
          : `${theme.backgroundColor}ee`,
        color: theme.accentColor,
        borderColor: 'rgba(0,0,0,0.1)',
      }}
    >
      <div className="flex items-center gap-3">
        <Link href={'/dashboard'} passHref>
          <Button
            variant={'ghost'}
            size="sm"
            className="flex items-center gap-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
          >
            <HomeIcon className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Home</span>
          </Button>
        </Link>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3">
        <Button
          size="sm"
          variant={isEditing ? 'default' : 'outline'}
          className={`flex items-center gap-2 rounded-lg text-sm font-medium px-3 ${
            isEditing
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'hover:bg-black/5 dark:hover:bg-white/10'
          }`}
          onClick={toggleEditing}
        >
          {isEditing ? (
            <>
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Preview</span>
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <Button
          size="sm"
          variant="ghost"
          className="rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
          style={{
            color: theme.accentColor,
          }}
          onClick={handleCopy}
        >
          <Share className="w-4 h-4" />
          <span className="hidden sm:inline ml-2 text-sm">Share</span>
        </Button>
        <Button
          size="sm"
          className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-md hover:shadow-lg transition-all text-sm font-medium px-3 md:px-4"
          onClick={() => setMode('present')}
        >
          <Play className="h-4 w-4" />
          <span className="hidden sm:inline">Present</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
