import React from 'react';
import { onAuthenticateUser } from '../../../../actions/user';
import { Info, Sparkles, Layout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Props = {};

const SettingsPage = async (props: Props) => {
  const checkUser = await onAuthenticateUser();

  return (
    <div className="flex flex-col gap-10 max-w-4xl mx-auto p-6 md:p-12 min-h-[80vh] justify-center">
      <div className="flex flex-col items-center text-center gap-6">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-3xl font-bold shadow-2xl shadow-blue-500/20">
            {checkUser.user?.name?.charAt(0) || 'U'}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-[#0F0F0F] p-1.5 rounded-full border border-white/10">
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            {checkUser.user?.name}
          </h2>
          <p className="text-muted-foreground">{checkUser.user?.email}</p>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center space-y-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

        <div className="flex justify-center">
          <div className="p-4 bg-blue-500/10 rounded-2xl">
            <Layout className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl font-bold">Settings are evolving</h3>
          <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
            We are currently building a more powerful way for you to customize your Deckly
            experience. High-performance configurations and personalizations will be live soon.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/dashboard">
            <Button className="rounded-xl px-8 bg-white text-black hover:bg-gray-200 font-semibold">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="border-t border-white/5 pt-10">
        <div className="flex items-center gap-2 mb-4 text-blue-400">
          <Info className="w-5 h-5" />
          <h4 className="font-semibold uppercase tracking-widest text-sm">About Us</h4>
        </div>
        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
          Deckly is built for creators who value speed and aesthetic precision. Our mission is to
          bridge the gap between complex slide deck creation and seamless AI-driven design. We
          believe that your ideas deserve to be presented in their best light, without the friction
          of traditional software.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
