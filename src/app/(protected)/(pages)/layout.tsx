import React from 'react';
import { onAuthenticateUser } from '../../actions/user';
import { redirect } from 'next/navigation';
import { SidebarInset, SidebarProvider } from '../../../components/ui/sidebar';
import AppSidebar from '../../../components/global/app-sidebar';
import { getRecentProjects } from '../../actions/project';
import UpperInfoBar from '../../../components/global/upper-info-bar';

type Props = { children: React.ReactNode };

const layout = async ({ children }: Props) => {
  console.log('DASHBOARD LAYOUT RENDERED');

  const checkUser = await onAuthenticateUser();
  if (!checkUser.user) redirect('/sign-in');

  const recentProjects = await getRecentProjects();
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar user={checkUser.user} recentProjects={recentProjects.data ?? []} />
      </div>
      <SidebarInset>
        <UpperInfoBar user={checkUser.user}></UpperInfoBar>
        <div className="p-4"> {children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default layout;
