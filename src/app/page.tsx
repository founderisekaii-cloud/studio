import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, CheckCircle, FileText } from 'lucide-react';
import { services, publications } from '@/lib/dummy-data';
import { placeholderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === 'hero-image-1');
  const recentPublications = publications.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 p-4">
            <h1 className="text-4xl font-headline font-bold md:text-6xl lg:text-7xl tracking-tighter">
              Shivay Digital Press
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90">
              Transforming manuscripts into masterpieces for over five years. Your trusted partner in publishing.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/dashboard/submit">Submit Your Work</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center md:text-4xl">
              Our Publishing Services
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-muted-foreground text-lg">
              We offer a comprehensive suite of services to bring your stories to the world.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((service) => (
                <Card key={service.id} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-16 h-16 flex items-center justify-center">
                      {service.id === 's1' && <FileText className="w-8 h-8" />}
                      {service.id === 's2' && <BookOpen className="w-8 h-8" />}
                      {service.id === 's3' && <CheckCircle className="w-8 h-8" />}
                    </div>
                    <CardTitle className="font-headline mt-4">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
             <div className="text-center mt-12">
                <Button asChild variant="link" className="text-lg text-primary hover:text-primary/80">
                    <Link href="/services">Explore All Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Recent Publications */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-headline font-bold text-center md:text-4xl">
              From Our Press
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-center text-muted-foreground text-lg">
              Discover the latest works published through Shivay Digital Press.
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {recentPublications.map((pub) => {
                const pubImage = placeholderImages.find(p => p.id === pub.coverImageId);
                return (
                  <Card key={pub.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
                    <div className="relative h-64 w-full">
                      {pubImage && (
                         <Image
                          src={pubImage.imageUrl}
                          alt={`Cover of ${pub.title}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={pubImage.imageHint}
                        />
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-headline text-xl font-bold">{pub.title}</h3>
                      <p className="text-muted-foreground mt-2">by {pub.author}</p>
                      <p className="mt-4 text-sm line-clamp-3">{pub.abstract}</p>
                      <Button asChild variant="link" className="p-0 mt-4 text-primary">
                        <Link href="/archives">Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
            <div className="text-center mt-12">
                <Button asChild size="lg">
                    <Link href="/archives">Visit Archives</Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
