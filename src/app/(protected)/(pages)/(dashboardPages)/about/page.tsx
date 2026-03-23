'use client';

import React from 'react';
import { Sparkles, ShoppingBag, Palette, MapPin, Code2, Globe } from 'lucide-react';
import { Card } from '@/components/ui/card';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-700">
      {/* Brand Ethos */}
      <section className="mb-16 space-y-6">
        <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
          The Future of <span className="text-blue-500">Persuasion.</span>
        </h2>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
          Deckly is a high-performance, AI-powered presentation ecosystem designed to eliminate the
          friction between an idea and its visual execution.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-blue-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-widest text-xs">AI-Driven Creation</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Generate professional-grade PPTs from scratch using advanced AI, or use our manual
            editor for pixel-perfect control.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-violet-400">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-widest text-xs">Template Marketplace</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Access a curated library of templates created by the community. Buy premium layouts or
            sell your own designs to other creators.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-emerald-400">
            <Palette className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-widest text-xs">Theme Engine</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Design quickly by choosing from an extensive library of professional themes, ensuring
            your brand identity remains consistent.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-orange-400">
            <Globe className="w-5 h-5" />
            <h3 className="font-bold uppercase tracking-widest text-xs">Ecosystem</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            More than just a tool; a marketplace and a community for designers and presenters
            worldwide.
          </p>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10 p-8 rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Code2 className="w-24 h-24" />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <p className="text-xs font-bold text-blue-500 uppercase tracking-[0.2em]">
              Lead Architect
            </p>
            <h4 className="text-2xl font-bold">Yugank Upadhyaya</h4>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <MapPin className="w-4 h-4" />
              <span>Ghaziabad, Uttar Pradesh</span>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-medium">
              Next.js 15
            </div>
            <div className="px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-medium">
              Tailwind CSS
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutUs;
