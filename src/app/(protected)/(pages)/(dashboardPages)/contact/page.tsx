'use client';

import React from 'react';
import { ExternalLink, MessageSquare, Mail, Github, Linkedin, Twitter, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const ContactUs = () => {
  const contactLinks = [
    {
      name: 'GitHub',
      value: 'yugankkkupadhyaya',
      icon: <Github className="w-4 h-4" />,
      href: 'https://github.com/yugankkupadhyaya',
    },
    {
      name: 'Email',
      value: 'yugankkupadhyaya@gmail.com',
      icon: <Mail className="w-4 h-4" />,
      href: 'mailto:yugankkupadhyaya@gmail.com',
    },
    {
      name: 'LinkedIn',
      value: 'Yugank Upadhyaya',
      icon: <Linkedin className="w-4 h-4" />,
      href: 'https://www.linkedin.com/in/yugank-upadhyaya-188786248/',
    },
    {
      name: 'X',
      value: '@yugankupadhyaya',
      icon: <Twitter className="w-4 h-4" />,
      href: 'https://x.com/yugankupadhyaya',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="mb-12 space-y-2">
        <h2 className="text-4xl font-bold tracking-tight">Get in touch.</h2>
        <p className="text-muted-foreground text-lg">
          Available for collaborations, inquiries, or just a quick tech chat.
        </p>
      </div>

      {/* Minimal Link List */}
      <div className="space-y-1 mb-16">
        {contactLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] transition-colors border-b border-white/5 last:border-0"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 text-gray-500 group-hover:text-blue-500 transition-colors">
                {link.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                  {link.name}
                </span>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {link.value}
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </a>
        ))}
      </div>

      {/* Action Area & Location */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-white/10">
        <div className="flex items-center gap-4 group">
          <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
            <MapPin className="text-blue-500 w-5 h-5" />
          </div>
          <div className="text-sm">
            <p className="font-bold text-gray-200">Current Base</p>
            <p className="text-gray-500">Ghaziabad, Uttar Pradesh, India</p>
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          className="rounded-full border-white/10 hover:bg-white hover:text-black transition-all px-10 h-12 font-semibold"
        >
          <a href="mailto:yugankkupadhyaya@gmail.com" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Send a direct message
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ContactUs;
