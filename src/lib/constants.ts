import { Home, LayoutTemplateIcon, Settings, Trash } from 'lucide-react';

import type { NavItem } from '@/components/app-sidebar/nav-main';
// adjust import path if needed

export const data: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: NavItem[];
} = {
  user: {
    name: 'Shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Home',
      url: '/dashboard',
      icon: Home,
    },
    {
      title: 'Templates',
      url: '/templates',
      icon: LayoutTemplateIcon,
    },
    {
      title: 'Trash',
      url: '/trash',
      icon: Trash,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
  ],
};
