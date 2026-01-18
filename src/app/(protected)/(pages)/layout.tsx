import React from 'react';
import { onAuthenticateUser } from '../../../actions/user';
import { redirect } from 'next/navigation';
import { SidebarProvider } from '../../../components/ui/sidebar';

type Props = { children: React.ReactNode };

const layout = async ({ children }: Props) => { 
  // const resentProjects = await getRecentProjects();
  const checkUser = await onAuthenticateUser();
  if (!checkUser.user) redirect('/sign-in');

  return<SidebarProvider>
<AppSidebar></AppSidebar>
  </SidebarProvider>
  // <div>{children}</div>;
};

export default layout;
