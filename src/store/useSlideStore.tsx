import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Slide, Theme } from '../lib/types';
import { Project } from '@prisma/client';
import { v4 } from 'uuid';

interface SlideState {
  slides: Slide[];
  project: Project | null;
  currentTheme: Theme;
  currentSlide: number;

  setSlides: (slides: Slide[]) => void;
  setActiveProject: (project: Project) => void;
  setCurrentTheme: (theme: Theme) => void;

  removeSlide: (id: string) => void;
  addSlideAtIndex: (slide: Slide, index: number) => void;

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
      currentSlide: 0,

      setSlides: (slides: Slide[]) => {
        set({ slides });
      },

      setActiveProject: (project: Project) => {
        set({ project });
      },

      setCurrentTheme: (theme: Theme) => {
        set({ currentTheme: theme });
      },

      getOrderSlides: () => {
        const state = get();
        return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder);
      },

      removeSlide: (id: string) => {
        set((state) => ({
          slides: state.slides.filter((slide) => slide.id !== id),
        }));
      },

      addSlideAtIndex: (slide: Slide, index: number) => {
        set((state) => {
          const newSlides = [...state.slides];

          newSlides.splice(index, 0, {
            ...slide,
            id: v4(),
          });

          newSlides.forEach((s, i) => {
            s.slideOrder = i;
          });

          return {
            slides: newSlides,
            currentSlide: index,
          };
        });
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
