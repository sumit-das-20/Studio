
'use client';

import { useActionState, useFormStatus } from 'react';
import { signUpWithEmail } from '@/app/employee/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

const initialState = {
  success: false,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Create Account
    </Button>
  );
}

export default function EmployeeRegisterPage() {
  const [state, formAction] = useActionState(signUpWithEmail, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Account Created',
        description: 'Your employee account has been created successfully! You can now log in.',
      });
      formRef.current?.reset();
    }
  }, [state.success, toast]);


  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an Employee Account</CardTitle>
          <CardDescription>
            Enter your details below to create your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state?.error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <form ref={formRef} action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor='name'>Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor='email'>Email</Label>
                <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
             <div className="space-y-2">
                <Label htmlFor='phone'>Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1234567890" required />
            </div>
             <div className="space-y-2">
                <Label htmlFor='address'>Address</Label>
                <Textarea id="address" name="address" placeholder="123 Main St, Anytown, USA" required />
            </div>
             <div className="space-y-2">
                <Label htmlFor='idProof'>ID Proof Number</Label>
                <Input id="idProof" name="idProof" placeholder="e.g., Driver's License or National ID" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor='password'>Password</Label>
                <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <SubmitButton />
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/employee/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
