'use server';

/**
 * @fileOverview An AI flow to verify screenshots for social media task completion.
 *
 * - verifySocialTaskScreenshot - A function that analyzes a screenshot to verify a task.
 * - VerifyScreenshotInput - The input type for the verification function.
 * - VerifyScreenshotOutput - The return type for the verification function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VerifyScreenshotInputSchema = z.object({
  screenshotDataUri: z
    .string()
    .describe(
      "A screenshot of the completed task, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  taskInstructions: z.string().describe('The specific instructions for the task that was to be completed (e.g., "Like the post and leave a comment.").'),
  targetUrl: z.string().url().describe('The URL of the social media post, video, or profile the user was supposed to interact with.'),
  employeeInfo: z.string().describe('Information about the employee who submitted the proof, e.g., "Employee ID: EMP-001, Email: john.doe@example.com".'),
});
export type VerifyScreenshotInput = z.infer<typeof VerifyScreenshotInputSchema>;

const VerifyScreenshotOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the screenshot is valid proof of task completion.'),
  justification: z.string().describe('A brief explanation for why the proof is considered valid or invalid.'),
  confidenceScore: z.number().min(0).max(1).describe('A confidence score between 0 and 1 on the validity of the proof.'),
});
export type VerifyScreenshotOutput = z.infer<typeof VerifyScreenshotOutputSchema>;

export async function verifySocialTaskScreenshot(
  input: VerifyScreenshotInput
): Promise<VerifyScreenshotOutput> {
  return verifyScreenshotFlow(input);
}

const verifyScreenshotPrompt = ai.definePrompt({
  name: 'verifyScreenshotPrompt',
  input: { schema: VerifyScreenshotInputSchema },
  output: { schema: VerifyScreenshotOutputSchema },
  prompt: `You are an AI-powered verification agent for the Taskbatao platform. Your job is to meticulously analyze a screenshot submitted as proof of a completed social media task.

  **Context:**
  - **Platform:** Taskbatao (A service where employees get paid to complete small social media tasks for buyers).
  - **Employee:** {{{employeeInfo}}}
  - **Task Instructions:** {{{taskInstructions}}}
  - **Target URL:** {{{targetUrl}}}
  - **Submitted Proof:** An image of what the employee claims is the completed task.

  **Your Task:**
  1.  **Analyze the Image:** Examine the provided screenshot.
      - Does the content of the screenshot (e.g., a YouTube page, an Instagram post) seem to match the target URL?
      - Can you see evidence that the required action (e.g., a "Like" button being active, a "Subscribed" status, a comment) has been performed?
      - Look for signs of digital manipulation, low quality, or content that doesn't make sense (e.g., a screenshot of a completely unrelated website).

  2.  **Make a Decision:**
      - If the image clearly and unambiguously shows the task was completed as instructed, set \`isValid\` to \`true\`.
      - If the image is ambiguous, irrelevant, low-quality, or appears to be fraudulent, set \`isValid\` to \`false\`.

  3.  **Provide Justification:**
      - Briefly explain your reasoning in the \`justification\` field.
      - Example (Valid): "The screenshot clearly shows the YouTube channel has been subscribed to, and the UI matches the target URL."
      - Example (Invalid): "The screenshot is of the wrong Instagram post. The user was asked to like a different photo."
      - Example (Invalid): "The image is too blurry to verify if the 'Like' button has been clicked."
      
  4. **Set Confidence Score:**
      - Provide a confidence score for your decision. 1.0 for high confidence, 0.0 for low confidence.
      
  **IMPORTANT:** Be strict but fair. Your role is to prevent fraudulent submissions and ensure buyers get the service they paid for. If you detect a fake submission, log the details for admin review.

  **Image for Analysis:**
  {{media url=screenshotDataUri}}
  `,
});

const verifyScreenshotFlow = ai.defineFlow(
  {
    name: 'verifyScreenshotFlow',
    inputSchema: VerifyScreenshotInputSchema,
    outputSchema: VerifyScreenshotOutputSchema,
  },
  async (input) => {
    const { output } = await verifyScreenshotPrompt(input);

    if (output && !output.isValid) {
        console.log(`[AI FAKE-WORK WARNING] AI verification failed for ${input.employeeInfo}. Reason: ${output.justification}. Task: ${input.taskInstructions}`);
    }

    return output!;
  }
);
