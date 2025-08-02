
'use server';

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { FirebaseError } from 'firebase/app';


const signUpSchema = z.object({
    companyName: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const signInSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const emailSchema = z.string().email({ message: 'Invalid email address.' });


export async function signUpBuyer(prevState: any, formData: FormData) {
  const validatedFields = signUpSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.errors[0].message, isSuccess: false };
  }

  const { companyName, email, password } = validatedFields.data;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // In a real app, you would now save the companyName to a database like Firestore,
    // linked to the user's UID (userCredential.user.uid).
    console.log('New buyer signed up:', {
        uid: userCredential.user.uid,
        companyName,
        email,
    });
    return { success: true, error: null, isSuccess: true };
  } catch (error: any) {
     if (error instanceof FirebaseError) {
      return { success: false, error: error.message.replace('Firebase: ', ''), isSuccess: false };
    }
    return { success: false, error: "An unexpected error occurred.", isSuccess: false };
  }
}

export async function signInBuyer(prevState: any, formData: FormData) {
  const validatedFields = signInSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.errors[0].message, isSuccess: false };
  }

  const { email, password } = validatedFields.data;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    cookies().set('firebaseBuyerAuth', 'true', { maxAge: 60 * 60 * 24 }); // Expires in 24 hours
  } catch (error: any) {
    if (error instanceof FirebaseError) {
        switch (error.code) {
            case 'auth/invalid-credential':
                return { success: false, error: 'Invalid email or password. Please try again.', isSuccess: false };
            case 'auth/user-not-found':
                 return { success: false, error: 'No account found with this email address.', isSuccess: false };
            case 'auth/wrong-password':
                return { success: false, error: 'Incorrect password. Please try again.', isSuccess: false };
            default:
                return { success: false, error: error.message.replace('Firebase: ', ''), isSuccess: false };
        }
    }
    return { success: false, error: "An unexpected error occurred during sign-in.", isSuccess: false };
  }

  redirect('/buyer/dashboard');
}

export async function resetPasswordBuyer(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  const emailValidation = emailSchema.safeParse(email);
  if (!emailValidation.success) {
    return { success: false, error: emailValidation.error.errors[0].message, isSuccess: false };
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null, isSuccess: true };
  } catch (error: any) {
    if (error instanceof FirebaseError) {
      return { success: false, error: error.message.replace('Firebase: ', ''), isSuccess: false };
    }
    return { success: false, error: "An unexpected error occurred.", isSuccess: false };
  }
}
