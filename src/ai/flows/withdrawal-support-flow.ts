
'use server';

/**
 * @fileOverview A flow to handle user support queries related to withdrawals.
 *
 * - handleWithdrawalQuery - A function that provides answers to withdrawal-related questions.
 * - WithdrawalQueryInput - The input type for the handleWithdrawalQuery function.
 * - WithdrawalQueryOutput - The return type for the handleWithdrawalQuery function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WithdrawalQueryInputSchema = z.object({
  query: z.string().describe('The user\'s question about withdrawals.'),
});
export type WithdrawalQueryInput = z.infer<typeof WithdrawalQueryInputSchema>;

const WithdrawalQueryOutputSchema = z.object({
  answer: z.string().describe('The answer to the user\'s query.'),
  requiresFollowUp: z.boolean().describe('Whether the query requires human intervention and a support ticket should be raised.'),
});
export type WithdrawalQueryOutput = z.infer<typeof WithdrawalQueryOutputSchema>;

export async function handleWithdrawalQuery(
  input: WithdrawalQueryInput
): Promise<WithdrawalQueryOutput> {
  return withdrawalSupportFlow(input);
}

const withdrawalSupportPrompt = ai.definePrompt({
  name: 'withdrawalSupportPrompt',
  input: { schema: WithdrawalQueryInputSchema },
  output: { schema: WithdrawalQueryOutputSchema },
  prompt: `You are an AI support agent for Taskbatao, a platform where users complete tasks to earn money. Your role is to answer questions strictly related to the withdrawal process.

  Here is the information you must use to answer questions:
  - Minimum withdrawal amount: ₹400
  - Maximum withdrawal amount: ₹8000
  - Withdrawal processing time: Up to 72 hours (3 business days).
  - Payment methods: Bank Transfer, UPI, and PayPal.
  - Referral Bonus: Users earn a ₹10 bonus for each referral. This bonus can only be withdrawn after referring 10 users.
  - Referral Commission: Users earn a 0.10% commission on every withdrawal their referred friends make. This commission is added to their main earnings balance and can be withdrawn anytime, subject to the standard minimum withdrawal limit.

  Your tasks:
  1.  Analyze the user's query: {{{query}}}
  2.  Provide a clear and concise answer based ONLY on the information provided above.
  3.  If the user's question is about a topic other than withdrawals, you MUST state that you can only assist with withdrawal-related queries and set 'requiresFollowUp' to false.
  4.  If you cannot answer the question based on the information, or if the user is expressing frustration or needs human assistance for a complex issue (like a failed withdrawal), you MUST set 'requiresFollowUp' to true. When doing so, offer to create a ticket and also provide the support email as a fallback.

  Example Responses:
  - User Query: "What is the minimum amount I can withdraw?" -> Answer: "The minimum amount you can withdraw is ₹400.", requiresFollowUp: false
  - User Query: "How long does it take to get my money?" -> Answer: "Withdrawals are processed within 72 hours.", requiresFollowUp: false
  - User Query: "How do I change my password?" -> Answer: "I can only assist with questions about the withdrawal process. For help with your account settings, please check the 'Settings' page.", requiresFollowUp: false
  - User Query: "My withdrawal failed, what do I do?" -> Answer: "I am sorry to hear you are having trouble with your withdrawal. I can create a support ticket for our team to look into this. If the issue is urgent, you can also email our team directly at taskbatao@gmail.com. Would you like me to create the ticket?", requiresFollowUp: true
  `,
});

const withdrawalSupportFlow = ai.defineFlow(
  {
    name: 'withdrawalSupportFlow',
    inputSchema: WithdrawalQueryInputSchema,
    outputSchema: WithdrawalQueryOutputSchema,
  },
  async (input) => {
    const { output } = await withdrawalSupportPrompt(input);
    return output!;
  }
);
