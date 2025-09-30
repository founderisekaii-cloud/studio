'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import CustomerDashboard from '@/components/dashboard/customer-dashboard';
import EmployeeDashboard from '@/components/dashboard/employee-dashboard';
import AdminDashboard from '@/components/dashboard/admin-dashboard';
import SubmissionForm from '@/components/dashboard/submission-form';
import SubmissionsList from '@/components/dashboard/submissions-list';
import ProfilePage from '@/components/dashboard/profile-page';
import DataMigration from '@/components/dashboard/data-migration';
import UserManagement from '@/components/dashboard/user-management';

// A simple placeholder for auth state and role
const useUser = () => {
    // In a real app, this would come from an auth context.
    return {
        role: 'Admin', // Change to 'Employee' or 'Customer' to test
        name: 'Admin User',
    }
}

function DashboardContent() {
  const searchParams = useSearchParams();
  const view = searchParams.get('view');
  const user = useUser();

  const renderOverview = () => {
    switch(user.role) {
      case 'Admin': return <AdminDashboard />;
      case 'Employee': return <EmployeeDashboard />;
      case 'Customer':
      default:
        return <CustomerDashboard />;
    }
  }

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
}

export default function DashboardPage() {
    const user = useUser();

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-2">Welcome back, {user.name}!</h1>
            <p className="text-muted-foreground mb-8">Here's what's happening with your account today.</p>
            <Suspense fallback={<div>Loading...</div>}>
                <DashboardContent />
            </Suspense>
        </div>
    );
}
