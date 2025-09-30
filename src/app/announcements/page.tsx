import { announcements } from '@/lib/dummy-data';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Bell } from 'lucide-react';

export default function AnnouncementsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Announcements</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Stay up to date with the latest news and updates from Shivay Digital Press.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="bg-primary/10 text-primary p-3 rounded-full">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="font-headline text-2xl">{announcement.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Posted on {new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
