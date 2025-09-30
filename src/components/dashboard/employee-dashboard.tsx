import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { submissions } from '@/lib/dummy-data';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { FileText, AlertCircle } from 'lucide-react';

export default function EmployeeDashboard() {
  const needsReviewCount = submissions.filter(s => s.status === 'Submitted').length;

  return (
    <div className="space-y-8">
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">Needs Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{needsReviewCount}</div>
            <p className="text-xs text-muted-foreground">submissions are awaiting review.</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submissions Queue</CardTitle>
          <CardDescription>Submissions that require your attention.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="space-y-4">
            {submissions.filter(s => s.status === 'Submitted').slice(0, 5).map(sub => (
              <div key={sub.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-semibold">{sub.title}</h3>
                  <p className="text-sm text-muted-foreground">From Customer ID: {sub.customerId}</p>
                </div>
                 <Badge variant="destructive">Needs Review</Badge>
              </div>
            ))}
          </div>
          <Button asChild className="mt-6 w-full">
            <Link href="/dashboard?view=submissions">Manage All Submissions</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
