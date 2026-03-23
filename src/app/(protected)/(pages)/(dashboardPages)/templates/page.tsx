'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutTemplate, ArrowLeft, Rocket, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TemplatesPage = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center p-6 text-center">
      {/* Visual Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-600 to-violet-600 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-tr from-pink-600 to-orange-600 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-2xl">
        {/* Icon Header */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <LayoutTemplate className="w-20 h-20 text-blue-500 opacity-80" />
            <Sparkles className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Curated Templates</h1>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          We are currently hand-crafting professional layouts to help you build faster.
          <span className="block mt-2 font-medium text-blue-400">
            They will be live and ready to use very soon!
          </span>
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="w-full sm:w-auto flex items-center gap-2 bg-white text-black hover:bg-gray-200 transition-all font-semibold rounded-xl px-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-white/5 rounded-xl px-8 flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" />
            Notify Me
          </Button>
        </div>
      </div>

      {/* Footer hint matching your "Recently Opened" sidebar style */}
      <div className="mt-16 text-gray-500 text-xs uppercase tracking-widest">
        Deckly v1.0 • Coming Soon
      </div>
    </div>
  );
};

export default TemplatesPage;
