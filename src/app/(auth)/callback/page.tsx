import { redirect } from 'next/navigation';
import { onAuthenticateUser } from '@/actions/user';
import DashboardPage from './../../(protected)/(pages)/(dashboardPages)/Dashboard/page';

export default async function AuthCallbackPage() {
  const auth = await onAuthenticateUser();

  // If authentication + DB sync succeeded
  if (auth.status === 200 || auth.status === 201) {
    redirect('/Dashboard');
  }

  // Fallback: anything else goes back to sign-in
  redirect('/sign-in');
}
