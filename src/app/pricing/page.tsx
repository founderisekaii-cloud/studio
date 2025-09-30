import { pricing } from '@/lib/dummy-data';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Publishing Plans</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Choose the plan that best fits your publishing needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {pricing.map((tier) => (
          <Card
            key={tier.id}
            className={cn(
              'flex flex-col shadow-lg',
              tier.isPopular ? 'border-primary border-2 shadow-primary/20 -translate-y-4' : 'hover:shadow-xl'
            )}
          >
            {tier.isPopular && (
              <div className="bg-primary text-primary-foreground text-center py-2 font-bold text-sm">
                MOST POPULAR
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-headline">{tier.packageName}</CardTitle>
              <p className="text-4xl font-bold pt-4">{tier.price}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-4">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-accent mr-3 flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant={tier.isPopular ? 'default' : 'outline'}>
                <Link href={tier.price === 'Contact Us' ? '/contact' : '/signup'}>
                  {tier.price === 'Contact Us' ? 'Contact Us' : 'Get Started'}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center mt-16 text-muted-foreground">
        <p>Need a custom solution? <Link href="/contact" className="text-primary font-semibold hover:underline">Contact our team</Link> for a personalized quote.</p>
      </div>
    </div>
  );
}
