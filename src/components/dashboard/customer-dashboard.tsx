import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { submissions } from '@/lib/dummy-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FileText } from 'lucide-react';

export default function CustomerDashboard() {
  const inReviewCount = submissions.filter(s => s.status === 'In Review').length;
  const submittedCount = submissions.filter(s => s.status === 'Submitted').length;

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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inReviewCount}</div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Submitted</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submittedCount}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Recent Submissions</CardTitle>
          <CardDescription>Track the status of your work.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions.map(sub => (
              <div key={sub.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-semibold">{sub.title}</h3>
                  <p className="text-sm text-muted-foreground">Submitted on {sub.submissionDate}</p>
                </div>
                <Badge variant={sub.status === 'In Review' ? 'default' : 'secondary'} className={cn(sub.status === 'In Review' && 'bg-yellow-500 text-white')}>
                  {sub.status}
                </Badge>
              </div>
            ))}
          </div>
          <Button asChild className="mt-6 w-full">
            <Link href="/dashboard?view=submit">Make a New Submission</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
