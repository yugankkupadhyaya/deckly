import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ContentItem, Slide, Theme } from '../lib/types';
import { Project } from '@prisma/client';
import { v4 } from 'uuid';
import { useDeprecatedAnimatedState } from 'framer-motion';

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

  getOrderedSlides: () => Slide[];
  reOrderSlides: (fromIndex: number, toIndex: number) => void;
  setCurrentSlide: (index: number) => void;

  updateContentItem: (
    slideId: string,
    contentId: string,
    newContent: string | string[] | string[][] | ContentItem[]
  ) => void;

  addComponentInSlide: (
    slideId: string,
    item: ContentItem,
    parentId: string,
    index: number
  ) => void;
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

      setSlides: (slides) => set({ slides }),

      setActiveProject: (project) => set({ project }),

      setCurrentTheme: (theme) => set({ currentTheme: theme }),

      getOrderedSlides: () => {
        const state = get();
        return [...state.slides].sort((a, b) => a.slideOrder - b.slideOrder);
      },

      removeSlide: (id) =>
        set((state) => ({
          slides: state.slides.filter((slide) => slide.id !== id),
        })),

      addSlideAtIndex: (slide, index) =>
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
        }),

      reOrderSlides: (fromIndex, toIndex) =>
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
        }),

      setCurrentSlide: (index) => set({ currentSlide: index }),

      updateContentItem: (slideId, contentId, newContent) =>
        set((state) => {
          const updateContentRecursively = (item: ContentItem): ContentItem => {
            if (item.id === contentId) {
              return {
                ...item,
                content: newContent as string | string[] | string[][] | ContentItem[],
              };
            }

            if (Array.isArray(item.content)) {
              return {
                ...item,
                content: item.content.map((subItem) => {
                  if (typeof subItem === 'object' && 'id' in subItem) {
                    return updateContentRecursively(subItem as ContentItem);
                  }
                  return subItem;
                }) as ContentItem[],
              };
            }

            return item;
          };

          return {
            slides: state.slides.map((slide) => {
              if (slide.id !== slideId) return slide;

              return {
                ...slide,
                content: Array.isArray(slide.content)
                  ? slide.content.map((item) => updateContentRecursively(item))
                  : slide.content,
              };
            }),
          };
        }),
      addComponentInSlide: (slideId, item, parentId, index) =>
        set((state) => {
          const updateContentRecursively = (content: ContentItem): ContentItem => {
            // If this is the container where we insert the new component
            if (content.id === parentId && Array.isArray(content.content)) {
              const updatedContent = [...content.content];

              updatedContent.splice(index, 0, {
                ...item,
                id: item.id || v4(),
              });

              return {
                ...content,
                content: updatedContent.filter(
                  (c): c is ContentItem => typeof c === 'object' && c !== null && 'id' in c
                ),
              };
            }

            // If the current item has children, search inside them
            if (Array.isArray(content.content)) {
              return {
                ...content,
                content: content.content.map((child) =>
                  typeof child === 'object' && 'id' in child
                    ? updateContentRecursively(child as ContentItem)
                    : child
                ) as ContentItem[],
              };
            }

            // Otherwise return item unchanged
            return content;
          };

          const updatedSlides = state.slides.map((slide) => {
            if (slide.id !== slideId) return slide;

            return {
              ...slide,
              content: Array.isArray(slide.content)
                ? slide.content.map((item) => updateContentRecursively(item))
                : slide.content,
            };
          });

          return { slides: updatedSlides };
        }),
    }),
    {
      name: 'slide-storage',
      partialize: (state) => ({
        slides: state.slides,
        project: state.project,
        currentSlide: state.currentSlide,
      }),
    }
  )
);
