'use server';

/**
 * @fileOverview A flow to verify the format of a UPI ID.
 *
 * - verifyUpi - A function that checks if a UPI ID is valid.
 * - VerifyUpiInput - The input type for the verifyUpi function.
 * - VerifyUpiOutput - The return type for the verifyUpi function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyUpiInputSchema = z.object({
  upiId: z.string().describe('The UPI ID to be verified.'),
});
export type VerifyUpiInput = z.infer<typeof VerifyUpiInputSchema>;

const VerifyUpiOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the UPI ID format is valid.'),
  message: z.string().describe('A message indicating the verification status.'),
  verifiedName: z.string().optional().describe('The mock name of the account holder.'),
});
export type VerifyUpiOutput = z.infer<typeof VerifyUpiOutputSchema>;

export async function verifyUpi(input: VerifyUpiInput): Promise<VerifyUpiOutput> {
  return verifyUpiFlow(input);
}

const verifyUpiPrompt = ai.definePrompt({
  name: 'verifyUpiPrompt',
  input: {schema: VerifyUpiInputSchema},
  output: {schema: VerifyUpiOutputSchema},
  prompt: `You are a UPI ID verification simulator.
  
  Your task is to check if the provided UPI ID follows a valid format, which is typically 'username@bank'.
  - If the format is valid, return isValid as true, a success message, and a fictional name for the account holder (e.g., "John Doe").
  - If the format is invalid (e.g., missing '@', no bank handle), return isValid as false and a message explaining why it's invalid.
  - Do not perform any real-world verification. This is only a format check simulation.
  
  UPI ID: {{{upiId}}}
  `,
});

const verifyUpiFlow = ai.defineFlow(
  {
    name: 'verifyUpiFlow',
    inputSchema: VerifyUpiInputSchema,
    outputSchema: VerifyUpiOutputSchema,
  },
  async input => {
    // Simulate a short delay for the verification process
    await new Promise(resolve => setTimeout(resolve, 1000));
    const {output} = await verifyUpiPrompt(input);
    return output!;
  }
);
