'use server';

/**
 * @fileOverview Task categorization flow using AI to categorize tasks based on user profile data.
 *
 * - categorizeTask - A function that categorizes a task based on user data.
 * - CategorizeTaskInput - The input type for the categorizeTask function.
 * - CategorizeTaskOutput - The return type for the categorizeTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeTaskInputSchema = z.object({
  taskDescription: z.string().describe('Description of the task to categorize.'),
  userData: z.string().describe('User profile data including age, interests, etc.'),
});
export type CategorizeTaskInput = z.infer<typeof CategorizeTaskInputSchema>;

const CategorizeTaskOutputSchema = z.object({
  category: z.string().describe('The category of the task (e.g., educational, entertainment, financial).'),
  keywords: z.array(z.string()).describe('Keywords associated with the task for ad targeting.'),
});
export type CategorizeTaskOutput = z.infer<typeof CategorizeTaskOutputSchema>;

export async function categorizeTask(input: CategorizeTaskInput): Promise<CategorizeTaskOutput> {
  return categorizeTaskFlow(input);
}

const categorizeTaskPrompt = ai.definePrompt({
  name: 'categorizeTaskPrompt',
  input: {schema: CategorizeTaskInputSchema},
  output: {schema: CategorizeTaskOutputSchema},
  prompt: `You are an AI assistant specialized in categorizing tasks for online rewards applications.

  Given the following task description and user data, determine the most appropriate category for the task and generate relevant keywords for ad targeting.

  Task Description: {{{taskDescription}}}
  User Data: {{{userData}}}

  Category: (Choose one of: Educational, Entertainment, Financial, Lifestyle, Technology, Health)
  Keywords: (List keywords relevant to the task and user data, separated by commas)

  Ensure that your response matches the Category and Keywords output format exactly.
  `,
});

const categorizeTaskFlow = ai.defineFlow(
  {
    name: 'categorizeTaskFlow',
    inputSchema: CategorizeTaskInputSchema,
    outputSchema: CategorizeTaskOutputSchema,
  },
  async input => {
    const {output} = await categorizeTaskPrompt(input);
    return output!;
  }
);
