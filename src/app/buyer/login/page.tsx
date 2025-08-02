
'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BackButton } from '@/components/back-button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { signInBuyer } from '../actions';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  success: false,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Log In
    </Button>
  );
}

export default function BuyerLoginPage() {
  const [state, formAction] = useActionState(signInBuyer, initialState);
  const { toast } = useToast();

   useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Login Successful',
        description: "Welcome back! You're being redirected to your dashboard.",
      });
    }
  }, [state?.success, toast]);


  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Buyer Login</CardTitle>
          <CardDescription>
            Enter your email and password to access the buyer portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state?.error && (
             <Alert variant="destructive" className="mb-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="buyer@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-end text-sm">
                <Link href="#" className="underline">
                  Forgot Password?
                </Link>
              </div>
            <SubmitButton />
          </form>
           <div className="mt-4 text-center text-sm">
            Don't have a buyer account?{' '}
            <Link href="/buyer/register" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
