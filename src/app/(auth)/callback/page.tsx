import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

export default async function AuthCallbackPage() {
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    redirect('/dashboard');
  }

  if (auth.status === 403) {
    redirect('/sign-in');
  }


  redirect('/error');
}
