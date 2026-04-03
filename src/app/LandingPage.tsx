'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/global/app-sidebar';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar user={null as any} recentProjects={[]} />

        <SidebarInset className="flex flex-col flex-1 w-full">
          {/* NAVBAR */}
          <div className="flex items-center justify-end px-6 py-4 border-b border-border w-full">
            <div className="flex gap-3">
              <Button onClick={() => router.push('/sign-in')}>Sign In</Button>

              <Button variant="outline" onClick={() => router.push('/sign-in')}>
                Get Started
              </Button>
            </div>
          </div>

          {/* HERO */}
          <div className="flex flex-1 items-center justify-center w-full">
            <div className="text-center max-w-xl w-full px-6">
              {/* SVG */}
              <div className="mb-6 flex justify-center">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-muted-foreground"
                >
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M8 20h8" />
                  <path d="M12 16v4" />
                  <path d="M7 13l3-3 2 2 3-4" />
                </svg>
              </div>

              <h1 className="text-4xl font-bold mb-4">Create Presentations with AI</h1>

              <p className="text-muted-foreground mb-6">
                Login to start building stunning presentations in seconds using Deckly.
              </p>

              <div className="flex justify-center gap-4">
                <Button size="lg" onClick={() => router.push('/sign-in')}>
                  Sign Up
                </Button>

                <Button size="lg" variant="outline" onClick={() => router.push('/sign-in')}>
                  Login
                </Button>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default LandingPage;
