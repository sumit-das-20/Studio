
'use server';

import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const emailSchema = z.string().email({ message: 'Invalid email address.' });
const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters.' });

export async function signUpWithEmail(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const emailValidation = emailSchema.safeParse(email);
  if (!emailValidation.success) {
    return { success: false, error: emailValidation.error.errors[0].message };
  }

  const passwordValidation = passwordSchema.safeParse(password);
  if (!passwordValidation.success) {
    return { success: false, error: passwordValidation.error.errors[0].message };
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // In a real app, you might want to create a user profile in a database here.
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function signInWithEmail(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

   const emailValidation = emailSchema.safeParse(email);
  if (!emailValidation.success) {
    return { success: false, error: emailValidation.error.errors[0].message };
  }

  const passwordValidation = passwordSchema.safeParse(password);
  if (!passwordValidation.success) {
    return { success: false, error: passwordValidation.error.errors[0].message };
  }


  try {
    await signInWithEmailAndPassword(auth, email, password);
    // On successful login, redirect to the main app page.
  } catch (error: any) {
    return { success: false, error: error.message };
  }
  redirect('/');
}

export async function resetPassword(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  const emailValidation = emailSchema.safeParse(email);
  if (!emailValidation.success) {
    return { success: false, error: emailValidation.error.errors[0].message };
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
