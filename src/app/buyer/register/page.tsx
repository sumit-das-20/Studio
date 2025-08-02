
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { signUpBuyer } from '../actions';
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
      Create Buyer Account
    </Button>
  );
}

export default function BuyerRegisterPage() {
    const [state, formAction] = useActionState(signUpBuyer, initialState);
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);


    useEffect(() => {
        if (state?.success) {
        toast({
            title: 'Account Created',
            description: 'Your buyer account has been created successfully! You can now log in.',
        });
        formRef.current?.reset();
        }
    }, [state?.success, toast]);


    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
             <div className="absolute top-4 left-4">
                <BackButton />
            </div>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Create a Buyer Account</CardTitle>
                    <CardDescription>
                        Enter your company details below to create a buyer account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     {state?.error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{state.error}</AlertDescription>
                        </Alert>
                    )}
                    {state?.success && !state?.error && (
                         <Alert variant="default" className="mb-4 border-green-500 text-green-700">
                             <AlertTitle>Success!</AlertTitle>
                             <AlertDescription>Account created successfully. You can now <Link href="/buyer/login" className="underline font-bold">log in</Link>.</AlertDescription>
                         </Alert>
                    )}
                    <form ref={formRef} action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Company Name</Label>
                            <Input id="companyName" name="companyName" placeholder="Acme Inc." required />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="email">Work Email</Label>
                            <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="••••••••" required />
                        </div>
                        <SubmitButton />
                    </form>
                     <div className="mt-4 text-center text-sm">
                        Already have a buyer account?{' '}
                        <Link href="/buyer/login" className="underline">
                            Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
