'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSlideStore } from '../../../../../../store/useSlideStore';
import { useAnimation } from 'framer-motion';

import { Button } from '../../../../../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

import ThemeCard from './ThemeCard';
import ThemePicker from './ThemePicker';
import { Theme } from './../../../../../../lib/types';
import { themes } from '../../../../../../lib/constants';

type Props = {};

const ThemePreview = (props: Props) => {
  const router = useRouter();
  const params = useParams();
  const controls = useAnimation();

  const { project, currentTheme } = useSlideStore();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    controls.start('visible');
  }, [controls, selectedTheme]);

  /* ---------------- LEFT CARD ---------------- */
  const leftCardContent = (
    <div className="space-y-4">
      <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: selectedTheme.accentColor }}>
          Quick Start Guide
        </h3>
        <ol
          className="list-decimal list-inside space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Choose a theme</li>
          <li>Customize colors and fonts</li>
          <li>Add your content</li>
          <li>Preview & Publish</li>
        </ol>
      </div>

      <Button
        className="w-full h-11 font-semibold"
        style={{
          backgroundColor: selectedTheme.accentColor,
          color: selectedTheme.backgroundColor,
        }}
      >
        Get Started
      </Button>
    </div>
  );

  /* ---------------- MAIN CARD ---------------- */
  const mainCardContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: selectedTheme.accentColor + '10' }}
        >
          <p style={{ color: selectedTheme.accentColor }}>
            This is a smart layout: It acts as a text box
          </p>
        </div>

        <div
          className="rounded-xl p-6"
          style={{ backgroundColor: selectedTheme.accentColor + '10' }}
        >
          <p style={{ color: selectedTheme.accentColor }}>You can get these by typing /smart</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          className="px-6 h-11 font-semibold"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.fontColor,
          }}
        >
          Primary Button
        </Button>

        <Button
          variant="outline"
          className="px-6 h-11 font-semibold border-2"
          style={{
            borderColor: selectedTheme.accentColor,
            color: selectedTheme.accentColor,
          }}
        >
          Secondary Button
        </Button>
      </div>
    </div>
  );

  /* ---------------- RIGHT CARD ---------------- */
  const rightCardContent = (
    <div className="space-y-4">
      <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: selectedTheme.accentColor }}>
          Theme Features
        </h3>
        <ul
          className="list-disc list-inside space-y-2"
          style={{ color: selectedTheme.accentColor }}
        >
          <li>Responsive Design</li>
          <li>Dark & light modes</li>
          <li>Custom color schemes</li>
          <li>Accessibility optimized</li>
        </ul>
      </div>

      <Button
        variant="outline"
        className="w-full h-11 font-semibold border-2"
        style={{
          borderColor: selectedTheme.accentColor,
          color: selectedTheme.accentColor,
        }}
      >
        Explore Features
      </Button>
    </div>
  );

  return (
    <div
      className="h-screen w-full flex flex-col lg:flex-row overflow-hidden"
      style={{
        backgroundColor: selectedTheme.backgroundColor,
        fontFamily: selectedTheme.fontFamily,
      }}
    >
      {/* ---------------- CANVAS (NO SCROLL) ---------------- */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-8 left-8 z-20">
          <Button
            variant="outline"
            className="border-2"
            style={{
              borderColor: selectedTheme.accentColor,
              color: selectedTheme.accentColor,
            }}
            onClick={() => router.push('/create-page')}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back
          </Button>
        </div>

        <div className="relative w-full h-full flex items-center justify-center">
          <ThemeCard
            title="Quick start"
            description="Get up and running in no time"
            content={leftCardContent}
            variant="left"
            theme={selectedTheme}
            controls={controls}
          />

          <ThemeCard
            title="Main preview"
            description="This is the main preview card"
            content={mainCardContent}
            variant="main"
            theme={selectedTheme}
            controls={controls}
          />

          <ThemeCard
            title="Theme features"
            description="Discover powerful theme features"
            content={rightCardContent}
            variant="right"
            theme={selectedTheme}
            controls={controls}
          />
        </div>
      </div>

      {/* ---------------- SIDEBAR (SCROLLS) ---------------- */}
      <ThemePicker selectedTheme={selectedTheme} themes={themes} onSelectTheme={setSelectedTheme} />
    </div>
  );
};

export default ThemePreview;
