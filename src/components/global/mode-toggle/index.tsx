'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // ⛔ Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={theme}
      onValueChange={(value) => {
        if (value) setTheme(value);
      }}
    >
      <ToggleGroupItem value="dark" aria-label="Dark mode">
        <MoonIcon className="h-4 w-4" />
      </ToggleGroupItem>

      <ToggleGroupItem value="light" aria-label="Light mode">
        <SunIcon className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ThemeSwitcher;
