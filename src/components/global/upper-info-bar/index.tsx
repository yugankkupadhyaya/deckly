import { User } from '@prisma/client';
import React, { ReactNode } from 'react';
import { SidebarTrigger } from '../../ui/sidebar';
import SearchBar from './upper-info-searchbar';
import ThemeSwitcher from '../mode-toggle';
import { Button } from '../../ui/button';
import { Import, Upload } from 'lucide-react';
import NewProjectButton from './new-project-button';

type Props = {
  user: User;

};

const UpperInfoBar = ({ user }: Props) => {
  return (
    <header className="sticky top-0 z-10 flex shrink-0 flex-wrap items-center gap-2 bg-background p-4 justify-between">
      <SidebarTrigger className="-ml-1" />

      <div className="w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
        <SearchBar />
        <ThemeSwitcher />

        <div className="flex flex-wrap gap-4 items-center justify-end">
          <Button className="bg-primary-80 rounded-lg hover:bg-background-80 text-primary font-semibold cursor-not-allowed">
            <Import />
            Import
          </Button>

          <NewProjectButton user={user} />
        </div>
      </div>
    </header>
  );
};

export default UpperInfoBar;
