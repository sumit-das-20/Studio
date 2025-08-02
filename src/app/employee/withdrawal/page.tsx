
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
import { useState } from 'react';
import { Banknote, CheckCircle, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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

const formSchema = z.object({
  amount: z.coerce.number().min(100, { message: 'Withdrawal amount must be at least 100 INR.' }),
  paymentMethod: z.string({ required_error: 'Please select a payment method.' }),
  paymentDetails: z.string().min(10, { message: 'Please provide valid and complete payment details.' }),
});

export default function WithdrawalPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 100,
      paymentDetails: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    // Simulate API call to process withdrawal
    setTimeout(() => {
      console.log('Withdrawal Request:', values);
      if (values.amount > 5000) {
          setError("Withdrawal limit exceeded for this transaction.");
      } else {
        setSuccess(true);
        form.reset({ amount: 100, paymentDetails: '', paymentMethod: form.getValues('paymentMethod')});
      }
      setIsSubmitting(false);
    }, 2000);
  };

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
                        <div className="flex items-center gap-4">
                             <Banknote className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle className="text-2xl font-bold font-headline">Request a Withdrawal</CardTitle>
                                <CardDescription>
                                    Transfer your earnings to your preferred account. Minimum withdrawal is 100 INR.
                                </CardDescription>
                            </div>
                        </div>

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
                                <p className="text-muted-foreground">Your withdrawal request has been received and will be processed within 3-5 business days.</p>
                                <Button onClick={() => setSuccess(false)} variant="outline" className="mt-4">
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
                                                <FormLabel>Amount (INR)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="e.g., 500" {...field} />
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
                                                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a payment method" />
                                                    </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="bank-transfer">Bank Transfer (NEFT/IMPS)</SelectItem>
                                                        <SelectItem value="upi">UPI (GPay, PhonePe, etc.)</SelectItem>
                                                        <SelectItem value="paypal">PayPal</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="paymentDetails"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Payment Details</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Enter your Bank Account Number & IFSC Code, UPI ID, or PayPal Email Address." {...field} className="min-h-[100px]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="w-full" disabled={isSubmitting}>
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
