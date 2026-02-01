'use client';

import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../ui/sidebar';
import { Button } from '../../ui/button';
import { Sparkles } from 'lucide-react';

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
   
        <div className="flex w-full flex-col gap-2 group-data-[collapsible=icon]:hidden">
        
          {!prismaUser.subscription && (
            <div className="w-full rounded-xl border border-border bg-muted/40 p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">
                  Upgrade to <span className="text-primary">Creative AI</span>
                </p>
              </div>

              <p className="text-xs text-muted-foreground leading-snug mb-2">
                Unlock advanced AI features & faster generation.
              </p>

              <Button size="sm" className="h-8 w-full rounded-md text-xs font-medium">
                Upgrade
              </Button>
            </div>
          )}

          
          <SignedIn>
            <SidebarMenuButton className="justify-start gap-3 px-2 py-2">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'h-8 w-8',
                  },
                }}
              />

              <div className="flex flex-col text-left leading-tight pointer-events-none">
                <span className="text-sm font-medium text-foreground">{user.fullName}</span>
                <span className="text-xs text-muted-foreground truncate max-w-[160px]">
                  {user.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
