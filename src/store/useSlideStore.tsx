import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Slide } from '../lib/types';
import { Project } from '@prisma/client';

interface SlideState {
  slides: Slide[];
  project: Project | null;
  setSlides: (slides: Slide[]) => void;
  setProject: (project: Project) => void;
}

export const useSlideStore = create<SlideState>()(
  persist(
    (set) => ({
      slides: [],
      setSlides: (slides: Slide[]) => {
        set({ slides });
      },
      project: null,
      setProject: (project) => set({ project }),
    }),
    {
      name: 'slide-storage',
    }
  )
);
