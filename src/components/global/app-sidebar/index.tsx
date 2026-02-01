'use client';

import React from 'react';
import { Project, User } from '@prisma/client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import NavMain from './nav-main';
import RecentOpen from './recent-open';
import NavFooter from './nav-footer';
import { data } from '../../../lib/constants';

type AppSidebarProps = {
  recentProjects: Project[];
  user: User;
} & React.ComponentProps<typeof Sidebar>;

const AppSidebar = ({ recentProjects, user, className, ...props }: AppSidebarProps) => {
  return (
    <Sidebar
      collapsible="icon"
      className={cn('border-r border-border bg-background', className)}
      {...props}
    >
      {/* Header */}
      <SidebarHeader className="px-3 py-4">
        <SidebarMenuButton size="lg" className="gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/brand/decly.png" alt="decly-logo" />
            <AvatarFallback>Dl</AvatarFallback>
          </Avatar>

          {/* Hide text when collapsed */}
          <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden">Deckly</span>
        </SidebarMenuButton>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="flex-1 overflow-y-auto px-3 mt-6 gap-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="px-2 pb-2">
        <NavFooter prismaUser={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
