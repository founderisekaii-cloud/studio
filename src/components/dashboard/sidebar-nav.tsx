'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
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
import { Button } from '@/components/ui/button';
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
import { cn } from '@/lib/utils';
import { Suspense } from 'react';

// A simple placeholder for auth state and role
const useUser = () => {
    // In a real app, this would come from an auth context.
    // Roles could be 'Admin', 'Employee', 'Customer'
    return {
        role: 'Admin', // Change to 'Employee' or 'Customer' to test
        name: 'Admin User',
        email: 'admin@shivay.com',
    }
}

const NavItems = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useUser();

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
                <SidebarMenuButton>
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
