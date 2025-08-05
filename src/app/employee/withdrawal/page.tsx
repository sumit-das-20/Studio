

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useState, useTransition } from 'react';
import { Banknote, CheckCircle, History, Loader2, ShieldCheck, ShieldX, Pencil } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Header } from '@/components/header';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Trophy } from 'lucide-react';
import { SidebarNav } from '@/components/sidebar-nav';
import { verifyUpiId } from '../actions';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { useMockData } from '@/hooks/use-mock-data';
import type { AdminWithdrawalRequest } from '@/lib/types';


const formSchema = z.object({
    amount: z.coerce
        .number()
        .min(5, { message: 'Withdrawal amount must be at least $5.' })
        .max(100, { message: 'Withdrawal amount cannot exceed $100.' }),
    paymentMethod: z.string({ required_error: 'Please select a payment method.' }),
    paypalEmail: z.string().optional(),
    upiId: z.string().optional(),
    accountHolderName: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    confirmAccountNumber: z.string().optional(),
    ifscCode: z.string().optional(),
}).refine(data => {
    if (data.paymentMethod === 'bank-transfer') {
        return !!data.accountHolderName && !!data.bankName && !!data.accountNumber && !!data.confirmAccountNumber && !!data.ifscCode;
    }
    return true;
}, {
    message: "Please fill all bank details.",
    path: ["accountHolderName"], // Show error on one of the fields
})
.refine(data => {
    if (data.paymentMethod === 'bank-transfer') {
        return data.accountNumber === data.confirmAccountNumber;
    }
    return true;
}, {
    message: "Account numbers do not match.",
    path: ["confirmAccountNumber"],
})
.refine(data => {
    if (data.paymentMethod === 'upi') {
        return !!data.upiId;
    }
    return true;
}, {
    message: "Please enter a UPI ID.",
    path: ["upiId"],
})
.refine(data => {
    if (data.paymentMethod === 'paypal') {
        if (!data.paypalEmail) return false;
        try {
            z.string().email().parse(data.paypalEmail);
            return true;
        } catch (e) {
            return false;
        }
    }
    return true;
}, {
    message: "Please provide a valid PayPal email address.",
    path: ["paypalEmail"],
});


type FormSchemaType = z.infer<typeof formSchema>;


export default function WithdrawalPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { addWithdrawalRequest } = useMockData();
  
  const [isVerifying, startVerificationTransition] = useTransition();
  const [verificationResult, setVerificationResult] = useState<{isValid: boolean; message: string; verifiedName?: string} | null>(null);


  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 5,
      paypalEmail: '',
      upiId: '',
      accountHolderName: '',
      bankName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      ifscCode: '',
    },
  });

  const paymentMethod = form.watch('paymentMethod');
  const isUpiSelected = paymentMethod === 'upi';
  const isBankTransferSelected = paymentMethod === 'bank-transfer';
  const isPaypalSelected = paymentMethod === 'paypal';
  const isUpiVerified = verificationResult?.isValid === true;


  const handleVerifyUpi = async () => {
    const upiId = form.getValues('upiId');
    if (!upiId) {
        setVerificationResult({ isValid: false, message: 'Please enter a UPI ID.' });
        return;
    }
    setVerificationResult(null);
    startVerificationTransition(async () => {
        const result = await verifyUpiId(upiId);
        setVerificationResult(result);
        if (result.isValid) {
            form.setValue('upiId', `${upiId}`);
        }
    });
  }

  const handleEditUpi = () => {
    setVerificationResult(null);
    form.setValue('upiId', '');
  };

  const onSubmit = (values: FormSchemaType) => {
    if (isUpiSelected && !isUpiVerified) {
        setError("Please verify your UPI ID before submitting.");
        return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // Simulate API call to process withdrawal
    setTimeout(() => {
      console.log('Withdrawal Request:', values);
       // The form validation should handle this, but as a safeguard:
      if (values.amount < 5 || values.amount > 100) {
          setError("Withdrawal amount must be between $5 and $100.");
      } else {
        
        const newRequest: AdminWithdrawalRequest = {
            id: `WR-${Date.now()}`,
            employeeId: 'EMP-001', // In a real app, this would be the logged-in user's ID
            employeeEmail: 'john.doe@example.com', // Logged-in user's email
            amount: values.amount,
            method: values.paymentMethod as any,
            status: 'Pending',
            createdAt: new Date().toISOString().split('T')[0],
            upiId: values.upiId,
            paypalEmail: values.paypalEmail,
            bankDetails: values.paymentMethod === 'bank-transfer' ? {
                accountHolderName: values.accountHolderName || '',
                bankName: values.bankName || '',
                accountNumber: values.accountNumber || '',
                ifscCode: values.ifscCode || ''
            } : undefined
        };
        addWithdrawalRequest(newRequest);

        setSuccess(true);
        form.reset({ amount: 5, paymentMethod: form.getValues('paymentMethod'), upiId: '', paypalEmail: '' });
        setVerificationResult(null);
      }
      setIsSubmitting(false);
    }, 2000);
  };

  const resetForm = () => {
    setSuccess(false);
    setError(null);
    setVerificationResult(null);
    form.reset({ amount: 5, paymentMethod: undefined, upiId: '', paypalEmail: ''});
  }

  const handlePaymentMethodChange = (value: string) => {
    form.setValue('paymentMethod', value);
    setVerificationResult(null);
    form.reset({
        ...form.getValues(),
        paymentMethod: value,
        paypalEmail: '',
        upiId: '',
        accountHolderName: '',
        bankName: '',
        accountNumber: '',
        confirmAccountNumber: '',
        ifscCode: '',
    });
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-primary-foreground bg-primary px-2 py-1 rounded-md">TaskRabbit</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto">
                 <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <Banknote className="h-8 w-8 text-primary" />
                                <div>
                                    <CardTitle className="text-2xl font-bold font-headline">Request a Withdrawal</CardTitle>
                                    <CardDescription>
                                        Transfer your earnings. Please read the terms below before withdrawing.
                                    </CardDescription>
                                </div>
                            </div>
                            <Link href="/employee/withdrawal/history" className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
                                <History className="mr-2 h-4 w-4" />
                                View History
                            </Link>
                        </div>
                        <ul className="list-disc pl-5 mt-4 text-xs text-muted-foreground">
                            <li>Minimum withdrawal amount is $5.</li>
                            <li>Maximum withdrawal amount is $100.</li>
                            <li>Amount will be credited to your account within 72 hours.</li>
                        </ul>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {success ? (
                             <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-primary bg-primary/5 p-8 text-center">
                                <CheckCircle className="h-12 w-12 text-primary" />
                                <h3 className="text-xl font-bold text-primary">Request Submitted!</h3>
                                <p className="text-muted-foreground">Your withdrawal request has been received. The amount will be credited to your account within 72 hours.</p>
                                <Button onClick={resetForm} variant="outline" className="mt-4">
                                    Make Another Withdrawal
                                </Button>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Amount (USD)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="e.g., 50" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="paymentMethod"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Method</FormLabel>
                                                 <Select onValueChange={handlePaymentMethodChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a payment method" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="bank-transfer">Bank Transfer (International)</SelectItem>
                                                        <SelectItem value="upi">UPI (For India)</SelectItem>
                                                        <SelectItem value="paypal">PayPal</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {isUpiSelected && (
                                        <div className='space-y-2'>
                                            <FormField
                                                control={form.control}
                                                name="upiId"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>UPI ID</FormLabel>
                                                        <div className="flex gap-2">
                                                            <FormControl>
                                                                <Input placeholder="yourname@bank" {...field} disabled={isVerifying || isUpiVerified} />
                                                            </FormControl>
                                                            {isUpiVerified ? (
                                                                <Button type="button" variant="outline" onClick={handleEditUpi}>
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Button>
                                                            ) : (
                                                                <Button type="button" onClick={handleVerifyUpi} disabled={isVerifying}>
                                                                    {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                                    Verify
                                                                </Button>
                                                            )}
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                                />
                                            {verificationResult && (
                                                <div className={cn("flex items-center gap-2 text-sm", verificationResult.isValid ? 'text-green-600' : 'text-destructive')}>
                                                    {verificationResult.isValid ? <ShieldCheck className='h-4 w-4' /> : <ShieldX className='h-4 w-4' />}
                                                    <p>{verificationResult.message} {verificationResult.isValid && <b>{verificationResult.verifiedName}</b>}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {isBankTransferSelected && (
                                        <div className="space-y-4 rounded-md border p-4">
                                            <FormField
                                                control={form.control}
                                                name="accountHolderName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Account Holder Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter the name on the bank account" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="bankName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Bank Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g., State Bank of India" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="accountNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Bank Account Number</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter account number" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="confirmAccountNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Confirm Bank Account Number</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter account number again" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="ifscCode"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>IFSC / SWIFT Code</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Enter bank's routing code" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}

                                     {isPaypalSelected && (
                                         <FormField
                                            control={form.control}
                                            name="paypalEmail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>PayPal Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="Enter your PayPal email address." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                   

                                    <Button type="submit" className="w-full" disabled={isSubmitting || (isUpiSelected && !isUpiVerified)}>
                                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Submit Withdrawal Request
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>

  );
}
