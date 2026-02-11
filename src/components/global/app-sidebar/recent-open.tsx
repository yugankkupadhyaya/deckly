'use client';
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
import { JsonValue } from '@prisma/client/runtime/library';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSlideStore } from './../../../store/useSlideStore';

type Props = {
  recentProjects: Project[];
};

const RecentOpen = ({ recentProjects }: Props) => {
  const router = useRouter();
  const { setSlides } = useSlideStore();

  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId) {
      toast.error('Project not found.', {
        description: 'Please try again',
      });
      return;
    }

    setSlides(JSON.parse(JSON.stringify(slides)));
    router.push(`/presentation/${projectId}`);
  };

  return recentProjects.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel>Recently Opened</SidebarGroupLabel>

      <SidebarMenu>
        {recentProjects.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton asChild tooltip={item.title} className="hover:bg-muted">
              <Button
                variant="link"
                className="w-full justify-start"
                onClick={() => {
                  handleClick(item.id, item.slides);
                }}
              >
                <span>{item.title}</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ) : (
    <SidebarGroup>
      <SidebarGroupLabel>No recent projects</SidebarGroupLabel>
    </SidebarGroup>
  );
};

export default RecentOpen;
