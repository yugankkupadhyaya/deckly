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
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="testing"
            className="hover:"
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
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default RecentOpen;
