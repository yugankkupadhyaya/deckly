import React from 'react';
import { onAuthenticateUser } from '../../../actions/user';
import { redirect } from 'next/navigation';
import { SidebarProvider } from '../../../components/ui/sidebar';
import AppSidebar from '../../../components/global/app-sidebar';
import { getRecentProjects } from '../../../actions/project';

type Props = { children: React.ReactNode };

const layout = async ({ children }: Props) => {
  console.log('DASHBOARD LAYOUT RENDERED');

  const recentProjects = await getRecentProjects();
  const checkUser = await onAuthenticateUser();
  if (!checkUser.user) redirect('/sign-in');
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar
          user={checkUser.user}
          recentProjects={recentProjects.data ?? []}
        />
        {/* {children} */}
      </div>
    </SidebarProvider>
  );
}
export default layout;
