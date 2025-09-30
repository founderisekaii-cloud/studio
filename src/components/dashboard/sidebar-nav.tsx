'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  FileText,
  User,
  Settings,
  LogOut,
  UploadCloud,
  Users,
} from 'lucide-react';
import { Suspense } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '../ui/skeleton';

const NavItems = () => {
  const searchParams = useSearchParams();
  const { user, loading, logout } = useAuth();

  if (loading || !user) {
    return (
        <div className="p-4 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
        </div>
    )
  }

  const currentView = searchParams.get('view') || 'overview';

  const customerNav = [
    { view: 'overview', label: 'Overview', icon: LayoutDashboard },
    { view: 'submit', label: 'Submit Work', icon: FileText },
    { view: 'profile', label: 'My Profile', icon: User },
  ];

  const employeeNav = [
    ...customerNav.filter(item => item.view !== 'submit'),
    { view: 'submissions', label: 'Manage Submissions', icon: Settings },
  ];

  const adminNav = [
    ...employeeNav,
    { view: 'migration', label: 'Data Migration', icon: UploadCloud },
    { view: 'users', label: 'User Management', icon: Users },
  ];

  let navItems = customerNav;
  if (user.role === 'Employee') navItems = employeeNav;
  if (user.role === 'Admin') navItems = adminNav;

  const isActive = (view: string) => currentView === view;

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Icons.Logo className="size-8" />
          <span className="text-lg font-headline font-semibold">Shivay Press</span>
        </Link>
      </SidebarHeader>
      <Separator className="bg-sidebar-border" />
      <SidebarContent>
        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.view}>
                <Link href={`/dashboard?view=${item.view}`} passHref legacyBehavior>
                  <SidebarMenuButton
                    isActive={isActive(item.view)}
                    className="w-full"
                  >
                    <item.icon className="size-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <Separator className="bg-sidebar-border" />
      <SidebarFooter>
         <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton onClick={logout}>
                    <LogOut className="size-4" />
                    <span>Log Out</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </>
  );
};

export function DashboardSidebarNav() {
    return (
        <Suspense fallback={<div>Loading Navigation...</div>}>
            <NavItems />
        </Suspense>
    )
}
