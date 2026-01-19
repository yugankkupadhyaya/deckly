'use client';

import React from 'react';
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type SubItem = {
  title: string;
  url: string;
};

type NavItem = {
  title: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  items?: SubItem[];
};

type Props = {
  items: NavItem[];
};

const NavMain = ({ items }: Props) => {
  const pathname = usePathname();

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const active = pathname.startsWith(item.url);

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  'group relative flex h-11 items-center gap-3 rounded-lg px-3 transition-all',
                  'hover:bg-muted hover:text-foreground',
                  'focus-visible:ring-2 focus-visible:ring-ring',
                  active && 'bg-muted text-foreground'
                )}
              >
                <Link href={item.url} className="flex w-full items-center gap-3">
                  {/* Active indicator */}
                  <span
                    className={cn(
                      'absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r bg-primary opacity-0 transition-all',
                      active && 'opacity-100'
                    )}
                  />

                  {/* Icon */}
                  <item.icon
                    className={cn(
                      'h-4 w-4 text-muted-foreground transition-colors',
                      'group-hover:text-foreground',
                      active && 'text-primary'
                    )}
                  />

                  {/* Label */}
                  <span
                    className={cn(
                      'text-sm font-medium transition-colors',
                      'group-hover:text-foreground',
                      active && 'text-primary'
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
