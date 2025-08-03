
'use server';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { FirebaseError } from 'firebase/app';

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
