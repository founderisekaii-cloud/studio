import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, BookHeart, Users } from 'lucide-react';

export default function AboutPage() {
  const aboutImage = placeholderImages.find(p => p.id === 'about-us-image');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">About Shivay Digital Press</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          For over five years, we have been dedicated to transforming insightful manuscripts into published masterpieces.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-headline font-semibold">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            At Shivay Digital Press, our mission is to empower authors and researchers by providing a seamless, transparent, and high-quality publishing experience. We believe that every great idea deserves to be shared with the world, and we are committed to being the bridge that connects brilliant minds with eager readers.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We leverage modern technology and a dedication to academic and creative integrity to ensure that each publication meets the highest standards of excellence. From submission to global distribution, we are your partners in knowledge dissemination.
          </p>
        </div>
        <div>
          {aboutImage && (
            <Card className="overflow-hidden shadow-lg">
                <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                data-ai-hint={aboutImage.imageHint}
                />
            </Card>
          )}
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-headline font-bold text-center">Our Values</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-8 shadow-lg">
            <Trophy className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-headline font-semibold">Excellence</h3>
            <p className="mt-2 text-muted-foreground">We uphold the highest standards of quality in every aspect of our work, from editing to final production.</p>
          </Card>
          <Card className="text-center p-8 shadow-lg">
            <BookHeart className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-headline font-semibold">Integrity</h3>
            <p className="mt-2 text-muted-foreground">We operate with transparency and honesty, building trust with our authors and the academic community.</p>
          </Card>
          <Card className="text-center p-8 shadow-lg">
            <Users className="mx-auto h-12 w-12 text-primary" />
            <h3 className="mt-4 text-xl font-headline font-semibold">Partnership</h3>
            <p className="mt-2 text-muted-foreground">We view our authors as partners, working collaboratively to achieve shared success and impact.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
