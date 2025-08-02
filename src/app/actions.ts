'use server';

import { categorizeTask } from '@/ai/flows/categorize-tasks';

export async function handleTaskCompletion(
  taskDescription: string,
  userInput: string
) {
  // Basic validation
  if (!taskDescription || !userInput) {
    return { success: false, error: 'Invalid input provided.' };
  }

  try {
    const result = await categorizeTask({
      taskDescription,
      userData: `User input for the task was: "${userInput}"`,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error('AI task categorization failed:', error);
    return {
      success: false,
      error: 'An error occurred while categorizing the task.',
    };
  }
}
