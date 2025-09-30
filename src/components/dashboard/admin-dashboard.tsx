import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { submissions, users, publications } from '@/lib/dummy-data';
import Link from 'next/link';
import { FileText, Users, Book, UploadCloud } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Publications</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publications.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Tools</CardTitle>
          <CardDescription>Quick access to site management functions.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link href="/dashboard?view=submissions">
                    <FileText />
                    <span>Manage Submissions</span>
                </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link href="/dashboard?view=users">
                    <Users />
                    <span>Manage Users</span>
                </Link>
            </Button>
            <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link href="/dashboard?view=migration">
                    <UploadCloud />
                    <span>Data Migration</span>
                </Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
