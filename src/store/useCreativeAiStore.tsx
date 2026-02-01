import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { OutlineCard } from '../lib/types';

type CreativeAiStore = {
  outlines: OutlineCard[];
  addOutline: (outline: OutlineCard) => void;
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  CurrentAiPrompt: string;
  setCurrentAIPrompt: (prompt: string) => void;
  resetOutlines: () => void;
};

const useCreativeAIStore = create<CreativeAiStore>()(
  persist(
    (set) => ({
      outlines: [],

      addOutline: (outline) =>
        set((state) => ({
          outlines: [outline, ...state.outlines],
        })),

      addMultipleOutlines: (outlines) =>
        set((state) => ({
          outlines: [...outlines, ...state.outlines],
        })),

      resetOutlines: () => {
        set({ outlines: [] });
      },

      CurrentAiPrompt: '',
      setCurrentAIPrompt: (prompt) => set({ CurrentAiPrompt: prompt }),
    }),

    { name: 'creative-ai' }
  )
);

export default useCreativeAIStore;
