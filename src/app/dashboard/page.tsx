'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import CustomerDashboard from '@/components/dashboard/customer-dashboard';
import EmployeeDashboard from '@/components/dashboard/employee-dashboard';
import AdminDashboard from '@/components/dashboard/admin-dashboard';
import SubmissionForm from '@/components/dashboard/submission-form';
import SubmissionsList from '@/components/dashboard/submissions-list';
import ProfilePage from '@/components/dashboard/profile-page';
import DataMigration from '@/components/dashboard/data-migration';
import UserManagement from '@/components/dashboard/user-management';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-6 w-3/4" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
            </div>
            <Skeleton className="h-64" />
        </div>
    );
  }

  const renderOverview = () => {
    switch(user.role) {
      case 'Admin': return <AdminDashboard />;
      case 'Employee': return <EmployeeDashboard />;
      case 'Customer':
      default:
        return <CustomerDashboard />;
    }
  }

  const renderContent = () => {
    switch (view) {
      case 'submit':
        return <SubmissionForm />;
      case 'submissions':
        if (user.role === 'Admin' || user.role === 'Employee') return <SubmissionsList />;
        return renderOverview();
      case 'profile':
        return <ProfilePage />;
      case 'migration':
        if (user.role === 'Admin') return <DataMigration />;
        return renderOverview();
      case 'users':
          if (user.role === 'Admin') return <UserManagement />;
          return renderOverview();
      case 'overview':
      default:
        return renderOverview();
    }
  };

  return (
    <div>
        <h1 className="text-3xl font-bold font-headline mb-2">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground mb-8">Here's what's happening with your account today.</p>
        {renderContent()}
    </div>
  );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
