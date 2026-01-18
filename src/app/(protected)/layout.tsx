export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { onAuthenticateUser } from '../../actions/user';

type Props = {
  children: React.ReactNode;
};

export default async function Layout({ children }: Props) {
  let auth;

  try {
    auth = await onAuthenticateUser();
  } catch (error) {
    // NEVER let a layout crash
    redirect('/sign-in');
  }

  if (!auth || !auth.user) {
    redirect('/sign-in');
  }

  return <div className="w-full min-h-screen">{children}</div>;
}
