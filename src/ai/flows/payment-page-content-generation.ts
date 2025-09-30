'use server';
/**
 * @fileOverview Generates content for the payment page based on Razorpay API key configuration.
 *
 * - generatePaymentPageContent - A function that generates the payment page content.
 * - PaymentPageContentInput - The input type for the generatePaymentPageContent function.
 * - PaymentPageContentOutput - The return type for the generatePaymentPageContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PaymentPageContentInputSchema = z.object({
  razorpayConfigured: z
    .boolean()
    .describe(
      'Indicates whether Razorpay API keys are configured (true) or not (false).'
    ),
});
export type PaymentPageContentInput = z.infer<typeof PaymentPageContentInputSchema>;

const PaymentPageContentOutputSchema = z.object({
  content: z
    .string()
    .describe('The content to display on the payment page.'),
});
export type PaymentPageContentOutput = z.infer<typeof PaymentPageContentOutputSchema>;

export async function generatePaymentPageContent(
  input: PaymentPageContentInput
): Promise<PaymentPageContentOutput> {
  return paymentPageContentFlow(input);
}

const paymentPageContentPrompt = ai.definePrompt({
  name: 'paymentPageContentPrompt',
  input: {schema: PaymentPageContentInputSchema},
  output: {schema: PaymentPageContentOutputSchema},
  prompt: `You are an expert at generating content for a payment page.

  Generate content for the payment page based on whether Razorpay API keys are configured.
  If Razorpay is configured, indicate that full payment flow is available.
  If Razorpay is not configured, indicate that payment is not yet configured.

  Razorpay Configured: {{razorpayConfigured}}

  Output the payment page content:
  `,
});

const paymentPageContentFlow = ai.defineFlow(
  {
    name: 'paymentPageContentFlow',
    inputSchema: PaymentPageContentInputSchema,
    outputSchema: PaymentPageContentOutputSchema,
  },
  async input => {
    const {output} = await paymentPageContentPrompt(input);
    return output!;
  }
);
