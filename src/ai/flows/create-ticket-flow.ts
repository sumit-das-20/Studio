'use server';

/**
 * @fileOverview An AI flow to generate a concise support ticket summary.
 *
 * - generateTicketSummary - A function that takes a problem description and creates a ticket.
 * - GenerateTicketInput - The input type for the ticket generation function.
 * - GenerateTicketOutput - The return type for the ticket generation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTicketInputSchema = z.object({
  problemDescription: z.string().describe('The full description of the user\'s problem.'),
});
export type GenerateTicketInput = z.infer<typeof GenerateTicketInputSchema>;

const GenerateTicketOutputSchema = z.object({
  title: z.string().describe('A short, descriptive title for the support ticket (max 10 words).'),
  summary: z.string().describe('A one-paragraph summary of the issue.'),
  category: z.enum(['Payment', 'Campaign', 'Withdrawal', 'Technical', 'Account', 'General']).describe('The category that best fits the issue.'),
});
export type GenerateTicketOutput = z.infer<typeof GenerateTicketOutputSchema>;

export async function generateTicketSummary(
  input: GenerateTicketInput
): Promise<GenerateTicketOutput> {
  return createTicketFlow(input);
}

const createTicketPrompt = ai.definePrompt({
  name: 'createTicketPrompt',
  input: { schema: GenerateTicketInputSchema },
  output: { schema: GenerateTicketOutputSchema },
  prompt: `You are a support ticket analyst. Your job is to read a user's problem description and generate a structured support ticket.

  **Instructions:**
  1.  Read the user's problem carefully: {{{problemDescription}}}
  2.  Create a concise but informative title for the ticket.
  3.  Write a clear, one-paragraph summary of the core issue.
  4.  Categorize the ticket into one of the following categories: Payment, Campaign, Withdrawal, Technical, Account, General.

  **Example:**
  - Problem: "My payment was taken from my account but the campaign isn't showing up! The transaction ID is 12345. Please help."
  - Output:
    {
      "title": "Payment Deducted but Campaign Not Activated",
      "summary": "User reports that a payment was successfully deducted from their account (Transaction ID: 12345), but the corresponding campaign has not been activated in their dashboard. They are requesting an investigation into the missing campaign.",
      "category": "Payment"
    }
  `,
});

const createTicketFlow = ai.defineFlow(
  {
    name: 'createTicketFlow',
    inputSchema: GenerateTicketInputSchema,
    outputSchema: GenerateTicketOutputSchema,
  },
  async (input) => {
    const { output } = await createTicketPrompt(input);
    return output!;
  }
);
