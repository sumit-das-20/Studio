
'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { FirebaseError } from 'firebase/app';
import { revalidatePath } from 'next/cache';

const signInSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});


export async function signInAdmin(prevState: any, formData: FormData) {
  const validatedFields = signInSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.errors[0].message };
  }

  const { email, password } = validatedFields.data;

  // In a real app, you'd likely want to check against a specific "admin" user role in your database.
  // For this simulation, we will use a hardcoded admin credential.
  const ADMIN_EMAIL = 'admin@taskrabbit.com';
  const ADMIN_PASSWORD = 'password';

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
       return { success: false, error: 'Invalid admin credentials.' };
  }


  try {
    // We can use a general sign-in method, but the authorization check above is key.
    // To avoid creating a real user for this, we'll just simulate the session.
    console.log('Admin signed in:', email);
    cookies().set('firebaseAdminAuth', 'true', { maxAge: 60 * 60 * 24 }); // Expires in 24 hours
  } catch (error: any) {
    // This part might not be reached with the simulated login, but it's good practice.
    if (error instanceof FirebaseError) {
        return { success: false, error: error.message.replace('Firebase: ', '') };
    }
    return { success: false, error: "An unexpected error occurred during sign-in." };
  }

  redirect('/admin/dashboard');
}


const taskSchema = z.object({
  id: z.string().optional(),
  type: z.enum(['Click and Earn', 'Watch and Earn', 'Link Shortener', 'Quiz', 'Social Media']),
  reward: z.coerce.number().min(0, "Reward cannot be negative."),
  // Simple Task
  question: z.string().optional(),
  adUnitId: z.string().optional(),
  // Link Shortener
  link: z.string().optional(),
  // Quiz
  options: z.array(z.string()).optional(),
  // Social Media
  platform: z.enum(['YouTube', 'Facebook', 'Instagram', '']).optional(),
  socialTaskType: z.string().optional(),
  title: z.string().optional(),
}).refine(data => {
    if (data.type === 'Click and Earn' || data.type === 'Watch and Earn') {
        return !!data.question && data.question.length >= 10;
    }
    return true;
}, { message: 'Question must be at least 10 characters long.', path: ['question']})
.refine(data => {
    if (data.type === 'Click and Earn' || data.type === 'Watch and Earn') {
        return !!data.adUnitId && data.adUnitId.length > 0;
    }
    return true;
}, { message: 'An Ad Unit ID is required for this task type.', path: ['adUnitId']})
.refine(data => {
    if (data.type === 'Link Shortener') {
        return !!data.link && z.string().url().safeParse(data.link).success;
    }
    return true;
}, { message: 'A valid URL is required for this task type.', path: ['link']})
.refine(data => {
    if (data.type === 'Quiz') {
        return !!data.question && data.question.length >= 10 && !!data.options && data.options.length >= 2 && data.options.every(opt => opt.length > 0);
    }
    return true;
}, { message: 'Quiz must have a question and at least 2 non-empty options.', path: ['question']})
.refine(data => {
    if (data.type === 'Social Media') {
        return !!data.platform && !!data.socialTaskType && !!data.title && !!data.link && z.string().url().safeParse(data.link).success;
    }
    return true;
}, { message: 'Platform, Task Type, Title, and a valid Link are required for Social Media tasks.', path: ['platform']})


export async function createTask(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const options = formData.getAll('options[]').map(String).filter(opt => opt.length > 0);
    const dataToValidate = { ...rawData, options: options.length > 0 ? options : undefined };
    
    const validatedFields = taskSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        return { success: false, error: validatedFields.error.flatten().fieldErrors };
    }

    // In a real app, you would save this data to a database like Firestore.
    // For this simulation, we'll just log it to the console.
    console.log("New Task Created by Admin:", validatedFields.data);
    
    // In a real app, after saving to the DB, you would revalidate the path
    // where the tasks are displayed to users.
    // e.g., revalidatePath('/employee/tasks/click-and-earn');

    return { success: true, error: null, data: validatedFields.data };
}

export async function updateTask(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const options = formData.getAll('options[]').map(String).filter(opt => opt.length > 0);
    const dataToValidate = { ...rawData, options: options.length > 0 ? options : undefined };
    
    const validatedFields = taskSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        return { success: false, error: validatedFields.error.flatten().fieldErrors };
    }

    // In a real app, you would update this data in a database like Firestore.
    console.log("Task Updated by Admin:", validatedFields.data);
    
    return { success: true, error: null, data: validatedFields.data };
}

export async function deleteTask(taskId: string) {
    if (!taskId) {
        return { success: false, error: "Task ID is required." };
    }
    // In a real app, you would delete this data from a database like Firestore.
    console.log("Task Deleted by Admin:", taskId);
    
    return { success: true, error: null, data: { id: taskId } };
}
