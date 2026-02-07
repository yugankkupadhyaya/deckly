import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Slide, Theme } from '../lib/types';
import { Project } from '@prisma/client';

interface SlideState {
  slides: Slide[];
  project: Project | null;
  setSlides: (slides: Slide[]) => void;
  setProject: (project: Project) => void;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
}

const defaultTheme: Theme = {
  name: 'Default',
  fontFamily: "'inter','sans-serif'",
  fontColor: '#333333',
  backgroundColor: '#f0f0f0',
  slideBackgroundColor: '#ffffff',
  accentColor: '#3b82fb',
  type: 'light',
};

export const useSlideStore = create<SlideState>()(
  persist(
    (set) => ({
      slides: [],
      setSlides: (slides: Slide[]) => {
        set({ slides });
      },
      project: null,
      setProject: (project) => set({ project }),
      currentTheme: defaultTheme,
      setCurrentTheme: (theme: Theme) => {
        set({ currentTheme: theme });
      },
    }),
    {
      name: 'slide-storage',
    }
  )
);
