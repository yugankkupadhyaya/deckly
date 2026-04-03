// app/page.tsx
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import LandingPage from './LandingPage';

export default async function Page() {
  const user = await currentUser();

  if (user) redirect('/dashboard');

  return <LandingPage />;
}
