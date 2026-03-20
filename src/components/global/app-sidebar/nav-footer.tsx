'use client';

import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { User } from '@prisma/client';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../ui/sidebar';
import { Button } from '../../ui/button';
import { Flashlight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { buySubscription } from '../../../app/actions/lemonSqueezy';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { showErrorToast } from '../../../lib/toast';

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const { user, isLoaded, isSignedIn } = useUser();
    if (!isLoaded || !user) return null;
  const [loading, setLoading] = useState(false);const router = useRouter();

  const handleUpgrading = async () => {
    setLoading(true);
    try {
      const res = await buySubscription(prismaUser.id);
      if (res.status != 200) throw new Error('Failed to upgrade subscription');
    } catch (error) {
      showErrorToast('Failed to upgrade subscription .Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex w-full flex-col gap-2 group-data-[collapsible=icon]:hidden">
          {!prismaUser.subscription && (
            <div className="w-full rounded-xl border border-border bg-muted/40 p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">
                  Get <span className="text-vivid  font-bold">Creative AI</span>
                </p>
              </div>

              <p className="text-xs text-muted-foreground leading-snug mb-2">
                Unlock advanced AI features & faster generation.
              </p>

              <div className="p-[1px] rounded-xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400">
                <Button
                  size="sm"
                  className="
      h-8 w-full rounded-2xl
      bg-zinc-900 text-white text-xs font-semibold
      
      transition-all duration-200
      hover:scale-[1.03]
      hover:bg-zinc-800
      
      active:scale-[0.97]
    "
                  onClick={handleUpgrading}
                >
                  {loading ? 'Upgrading...' : 'Upgrade'}
                </Button>
              </div>
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
