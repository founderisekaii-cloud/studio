import { services } from '@/lib/dummy-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, BookOpen, Globe, Palette, Fingerprint, Megaphone } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  FileText,
  BookOpen,
  Globe,
  Palette,
  Fingerprint,
  Megaphone,
};

export default function ServicesPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Services</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            A complete suite of services to support authors at every stage of the publishing journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <Card key={service.id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader>
                  <div className="mx-auto bg-primary text-primary-foreground rounded-full p-4 w-20 h-20 flex items-center justify-center">
                    {Icon && <Icon className="w-10 h-10" />}
                  </div>
                  <CardTitle className="font-headline mt-4 text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
