'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useSlideStore } from '../../../../../../store/useSlideStore';
import { MasterRecursiveComponent } from '../editor/MasterRecursiveComponent';
import { Button } from '../../../../../../components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  onClose: () => void;
};

const PresentationMode = ({ onClose }: Props) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { getOrderedSlides, currentTheme } = useSlideStore();
  const slides = getOrderedSlides();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
      }

      if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      }

      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onClose]);

  if (!slides.length) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/60" />

      <div
        className="relative w-full h-full flex items-center justify-center p-6 cursor-pointer"
        onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1))}
      >
        <div
          className="relative w-full max-w-6xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center"
          style={{
            aspectRatio: '16/9',
            maxHeight: '90vh',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex items-center justify-center"
              style={{
                background: currentTheme.gradientBackground || currentTheme.slideBackgroundColor,
                color: currentTheme.accentColor,
                fontFamily: currentTheme.fontFamily,
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-5xl px-10 py-8 flex flex-col justify-center gap-6">
                  <MasterRecursiveComponent
                    onContentChange={() => {}}
                    content={slides[currentSlideIndex].content}
                    isPreview={false}
                    isEditable={false}
                    slideId={slides[currentSlideIndex].id}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-4 right-4 text-white hover:bg-white/10"
          >
            <X />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlideIndex((prev) => Math.min(prev + 1, slides.length - 1));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="absolute bottom-4 right-6 text-white/60 text-sm">
            {currentSlideIndex + 1} / {slides.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationMode;
