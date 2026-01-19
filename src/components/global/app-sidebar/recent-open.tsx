
import { Project } from '@prisma/client';
import React from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../../ui/sidebar';
import { Button } from '../../ui/button';

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects }: Props) => {
  return recentProjects.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>

      <SidebarMenu>
        {recentProjects.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className="hover:bg-muted"
            >
              <Button
                variant="link"
                className="w-full justify-start"
                onClick={() => {}}
              >
                <span>testing</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ) : <SidebarGroup>
      <SidebarGroupLabel>No recent projects</SidebarGroupLabel>
  </SidebarGroup>;
};

export default RecentOpen;
