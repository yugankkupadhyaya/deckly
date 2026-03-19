'use client';

import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Palette, Check } from 'lucide-react';
import { useSlideStore } from '@/store/useSlideStore';
import { themes } from '@/lib/constants';
import { cn } from '@/lib/utils';

const RightSidebarPopover: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useSlideStore();
  const [open, setOpen] = useState(false);

  const handleThemeSelect = (themeName: string) => {
    const selectedTheme = themes.find((t) => t.name === themeName);
    if (selectedTheme) {
      setCurrentTheme(selectedTheme as any);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed right-4 top-20 z-50 h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-800 border dark:border-zinc-700 border-zinc-300 bg-white dark:bg-zinc-900"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-3 max-h-[500px] overflow-y-auto"
        side="left"
        sideOffset={8}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1 pb-2">
            <Palette className="h-4 w-4" />
            <span className="text-sm font-semibold">Themes</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {themes.slice(0, 12).map((theme) => (
              <button
                key={theme.name}
                onClick={() => handleThemeSelect(theme.name)}
                className={cn(
                  "relative aspect-video rounded-md border-2 overflow-hidden transition-all hover:scale-105",
                  currentTheme.name === theme.name ? "border-blue-500 ring-2 ring-blue-500/20" : "border-zinc-200 dark:border-zinc-700"
                )}
                style={{
                  backgroundColor: theme.backgroundColor,
                }}
                title={theme.name}
              >
                <div
                  className="absolute inset-0 opacity-50"
                  style={{
                    backgroundColor: theme.slideBackgroundColor,
                  }}
                />
                {currentTheme.name === theme.name && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="pt-2">
            <p className="text-xs text-zinc-500 px-1">More themes coming soon</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RightSidebarPopover;