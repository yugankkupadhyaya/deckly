import React from 'react';
import { Theme } from '../../../../../../lib/types';
import { Button } from '../../../../../../components/ui/button';

type Props = {
  selectedTheme: Theme;
  onSelectTheme: (theme: Theme) => void;
  themes: Theme[];
};

const ThemePicker = ({ selectedTheme, onSelectTheme, themes }: Props) => {
  const [loading, setLoading] = React.useState(false);

  return (
    <div
      className="w-full lg:w-[360px] lg:min-w-[320px] lg:max-w-[420px] overflow-hidden flex flex-col min-h-screen lg:h-screen lg:sticky lg:top-0 border-t lg:border-t-0 lg:border-l"
      style={{
        backgroundColor: selectedTheme.sidebarColor || selectedTheme.backgroundColor,
        borderColor: `${selectedTheme.accentColor}20`,
        boxShadow: `-12px 0 32px ${selectedTheme.accentColor}10`,
      }}
    >
      <div className="p-8 space-y-4 shrink-0">
        <div className="space-y-3">
          <h2
            className="text-3xl font-bold tracking-tight"
            style={{ color: selectedTheme.accentColor }}
          >
            Pick a Theme
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: `${selectedTheme.accentColor}90` }}>
            Select a theme that best fits your presentation style or generate a custom one based on
            your content. You can always change it later!
          </p>
        </div>
        <Button
          className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.backgroundColor,
          }}
          disabled={loading}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ThemePicker;
