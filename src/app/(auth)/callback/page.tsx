import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

export default async function AuthCallbackPage() {
  const auth = await onAuthenticateUser();

  // If authentication + DB sync succeeded
  if (auth.status === 200 || auth.status === 201) {
    redirect('/dashboard');
  }

  // Fallback: anything else goes back to sign-in
  redirect('/sign-in');
}
