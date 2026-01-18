import { Project, User } from '@prisma/client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type AppSidebarProps = {
  recentProjects: Project[];
  user: User;
} & React.ComponentProps<typeof Sidebar>;

const AppSidebar = ({ recentProjects, user, className, ...props }: AppSidebarProps) => {
  return (
    <Sidebar
      collapsible="icon"
      className={cn('max-w-[212px] bg-background/90', className)}
      {...props}
    >
      {/* ───────── Header ───────── */}
      <SidebarHeader className="pt-6 px-3 pb-0">
        <SidebarMenuButton size="lg" className="data-[state=open]:text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src="/public/brand/decly.png" alt="decly-logo" />
              <AvatarFallback className="rounded-lg">Dl</AvatarFallback>
            </Avatar>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>

      {/* ───────── Content ───────── */}
      <SidebarContent>
        <SidebarGroup>{/* menu items / recent projects go here */}</SidebarGroup>
      </SidebarContent>

      {/* ───────── Footer ───────── */}
      <SidebarFooter>{/* user / settings / logout */}</SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
