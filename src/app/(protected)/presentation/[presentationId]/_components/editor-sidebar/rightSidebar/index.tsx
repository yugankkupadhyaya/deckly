'use client';

import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { useSlideStore } from '../../../../../../../store/useSlideStore';
import RightSidebarPopover from './tabs/RightSideBarThemeSelector';
import ComponentsPanel from './tabs/ComponentsPanel';

type Props = {};

const EditorRightSideBar = (props: Props) => {
  const { currentTheme } = useSlideStore();

  return (
    <div className="fixed">
      <RightSidebarPopover />
      
    </div>
  );
};

export default EditorRightSideBar;
