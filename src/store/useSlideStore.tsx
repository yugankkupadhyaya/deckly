import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Slide, Theme } from '../lib/types';
import { Project } from '@prisma/client';

interface SlideState {
  slides: Slide[];
  project: Project | null;
  setSlides: (slides: Slide[]) => void;
  setActiveProject: (project: Project) => void;
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;

  getOrderSlides: () => Slide[];
  reOrderSlides: (fromIndex: number, toIndex: number) => void;
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
    (set, get) => ({
      slides: [],
      project: null,
      currentTheme: defaultTheme,

      setSlides: (slides: Slide[]) => {
        set({ slides });
      },

      setActiveProject: (project) => set({ project }),

      setCurrentTheme: (theme: Theme) => {
        set({ currentTheme: theme });
      },

      getOrderSlides: () => {
        const state = get();
        return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder);
      },

      reOrderSlides: (fromIndex: number, toIndex: number) => {
        set((state) => {
          const newSlides = [...state.slides];

          const [removed] = newSlides.splice(fromIndex, 1);
          newSlides.splice(toIndex, 0, removed);

          return {
            slides: newSlides.map((slide, index) => ({
              ...slide,
              slideOrder: index,
            })),
          };
        });
      },
    }),
    {
      name: 'slide-storage',
    }
  )
);
