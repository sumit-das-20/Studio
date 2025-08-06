'use server';

import { categorizeTask } from '@/ai/flows/categorize-tasks';
import { generateTicketSummary } from '@/ai/flows/create-ticket-flow';
import { addSupportTicket } from '@/lib/mock-data';

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

export async function createSupportTicket(
  problemDescription: string,
  userContext: { role: 'Buyer' | 'Employee'; email: string }
) {
  if (!problemDescription || !userContext.email) {
    return { success: false, error: 'Invalid input provided for ticket creation.' };
  }

  try {
    const aiResponse = await generateTicketSummary({ problemDescription });
    const newTicket = {
      id: `TICKET-${Date.now()}`,
      userEmail: userContext.email,
      userRole: userContext.role,
      title: aiResponse.title,
      description: aiResponse.summary,
      category: aiResponse.category,
      status: 'Open' as const,
      createdAt: new Date().toISOString(),
    };
    
    // This function adds the ticket to our "database"
    addSupportTicket(newTicket);

    return { success: true, ticketId: newTicket.id };
  } catch (error) {
     console.error('AI ticket creation failed:', error);
    return {
      success: false,
      error: 'An error occurred while creating the support ticket.',
    };
  }
}
