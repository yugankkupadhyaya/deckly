'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function PaymentsDown() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white px-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-lg p-6 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Content */}
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Payments Unavailable</h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            We are currently experiencing issues with our payment system. Please try again later or
            continue using other features of the app.
          </p>
        </div>

        {/* Optional Action */}
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-2 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
