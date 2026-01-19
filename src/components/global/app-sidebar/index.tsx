'use client';

import { Project, User } from '@prisma/client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

import NavMain from './nav-main';
import { data } from '../../../lib/constants';
import RecentOpen from './recent-open';

type AppSidebarProps = {
  recentProjects: Project[];
  user: User;
} & React.ComponentProps<typeof Sidebar>;

const AppSidebar = ({ recentProjects, user, className, ...props }: AppSidebarProps) => {
  return (
    <Sidebar
      collapsible="icon"
      className={cn('w-[240px] min-w-[240px] border-r border-border bg-background', className)}
      {...props}
    >
      <SidebarHeader className="px-3 py-4">
        <SidebarMenuButton size="lg" className="gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/brand/decly.png" alt="decly-logo" />
            <AvatarFallback>Dl</AvatarFallback>
          </Avatar>
          <span className="text-xl font-semibold">Deckly</span>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent className="px-3 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        
     <RecentOpen recentProjects={recentProjects}/>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
