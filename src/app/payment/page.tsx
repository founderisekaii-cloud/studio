import { generatePaymentPageContent } from '@/ai/flows/payment-page-content-generation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CreditCard, AlertTriangle } from 'lucide-react';

export default async function PaymentPage() {
  // In a real application, this would come from environment variables
  // e.g., const razorpayConfigured = !!process.env.RAZORPAY_KEY_ID;
  const razorpayConfigured = false; 

  const { content } = await generatePaymentPageContent({ razorpayConfigured });

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
              {razorpayConfigured ? (
                <CreditCard className="h-10 w-10" />
              ) : (
                <AlertTriangle className="h-10 w-10" />
              )}
            </div>
            <CardTitle className="font-headline text-3xl">Payment</CardTitle>
            <CardDescription>Complete your transaction</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground">{content}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
