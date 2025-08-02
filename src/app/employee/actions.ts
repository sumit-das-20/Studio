
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
import { verifyUpi } from '@/ai/flows/verify-upi-flow';
import { FirebaseError } from 'firebase/app';

const emailSchema = z.string().email({ message: 'Invalid email address.' });
const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters.' });
const upiIdSchema = z.string().min(3, { message: 'UPI ID cannot be empty.' });

const signUpSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your full name.' }),
  email: emailSchema,
  password: passwordSchema,
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  address: z.string().min(5, { message: 'Please enter your address.' }),
  idProof: z.string().min(3, { message: 'Please enter a valid ID proof number.' }),
});

export async function signUpWithEmail(prevState: any, formData: FormData) {
  const validatedFields = signUpSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
      return { success: false, error: validatedFields.error.errors[0].message };
  }

  const { name, email, password, phone, address, idProof } = validatedFields.data;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // In a real app, you would now save the extra details (name, phone, address, idProof)
    // to a database like Firestore, linked to the user's UID (userCredential.user.uid).
    console.log('New user signed up:', {
        uid: userCredential.user.uid,
        name,
        email,
        phone,
        address,
        idProof
    });
    return { success: true, error: null };
  } catch (error: any) {
     if (error instanceof FirebaseError) {
      return { success: false, error: error.message.replace('Firebase: ', '') };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});


export async function signInWithEmail(prevState: any, formData: FormData) {
  const validatedFields = signInSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, error: validatedFields.error.errors[0].message };
  }

  const { email, password } = validatedFields.data;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Upon successful sign-in, set a session cookie.
    cookies().set('firebaseAuth', 'true', { maxAge: 60 * 60 * 24 }); // Expires in 24 hours
  } catch (error: any) {
    if (error instanceof FirebaseError) {
        // Provide user-friendly error messages
        switch (error.code) {
            case 'auth/invalid-credential':
                return { success: false, error: 'Invalid email or password. Please try again.' };
            case 'auth/user-not-found':
                 return { success: false, error: 'No account found with this email address.' };
            case 'auth/wrong-password':
                return { success: false, error: 'Incorrect password. Please try again.' };
            default:
                return { success: false, error: error.message.replace('Firebase: ', '') };
        }
    }
    return { success: false, error: "An unexpected error occurred during sign-in." };
  }

  // Redirect to the dashboard on successful login. This must be called outside the try-catch block.
  redirect('/employee/dashboard');
}

export async function resetPassword(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;

  const emailValidation = emailSchema.safeParse(email);
  if (!emailValidation.success) {
    return { success: false, error: emailValidation.error.errors[0].message };
  }

  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error: any) {
    if (error instanceof FirebaseError) {
      return { success: false, error: error.message.replace('Firebase: ', '') };
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function signOut() {
  cookies().delete('firebaseAuth');
  cookies().delete('firebaseBuyerAuth');
  redirect('/');
}


export async function verifyUpiId(upiId: string) {
  const upiIdValidation = upiIdSchema.safeParse(upiId);
  if (!upiIdValidation.success) {
    return { isValid: false, message: upiIdValidation.error.errors[0].message };
  }

  try {
    const result = await verifyUpi({ upiId });
    return result;
  } catch (error) {
    console.error('UPI verification failed:', error);
    return {
      isValid: false,
      message: 'An error occurred during UPI verification.',
    };
  }
}
