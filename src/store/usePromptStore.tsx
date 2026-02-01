import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { OutlineCard } from '../lib/types';

export type Page = 'create' | 'creative-ai' | 'create-scratch';

type Prompt = {
  id: string;
  createdAt: string;
  title: string;
  outlines: OutlineCard[];
};

type PromptStore = {
  page: Page;
  setPage: (page: Page) => void;
  prompts: Prompt[] | [];
  addPrompt: (prompt: Prompt) => void;
  removePrompt: (id: string) => void;
  
};

const usePromptStore = create<PromptStore>()(
  devtools(
    persist(
      (set) => ({
        page: 'create',
        setPage: (page: Page) => {
          set({ page });
        },
        prompts: [],
        addPrompt: (prompts: Prompt) => {
          set((state) => ({
            prompts: [prompts, ...state.prompts],
          }));
        },
        removePrompt: (id: string) => {
          set((state) => ({
            prompts: state.prompts.filter((prompt: Prompt) => prompt.id != id),
          }));
        },
      }),
      { name: 'prompts' }
    )
  )
);

export default usePromptStore;
