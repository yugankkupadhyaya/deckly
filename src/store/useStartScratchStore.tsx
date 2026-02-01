import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { OutlineCard } from '../lib/types';

type OutlineStore = {
  outlines: OutlineCard[];
  resetOutlines: () => void;
  addOutlines: (outline: OutlineCard) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
};

export const useScratchStore = create<OutlineStore>()(
  devtools(
    persist(
      (set) => ({
        outlines: [],

        resetOutlines: () => {
          set({ outlines: [] });
        },

        addOutlines: (outline) => {
          set((state) => ({
            outlines: [...state.outlines, outline],
          }));
        },

        addMultipleOutlines: (outlines: OutlineCard[]) => {
          set({ outlines });
        },
      }),
      { name: 'scratch' }
    )
  )
);
