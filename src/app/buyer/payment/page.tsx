
'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BackButton } from '@/components/back-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CreditCard, CheckCircle, ShieldCheck } from 'lucide-react';
import { processPayment } from '../actions';
import { useRouter } from 'next/navigation';

const initialState = {
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing Payment...
        </>
      ) : (
        <>
          <CreditCard className="mr-2 h-4 w-4" />
          Pay Now
        </>
      )}
    </Button>
  );
}

export default function BuyerPaymentPage() {
  const [state, formAction] = useActionState(processPayment, initialState);
  const router = useRouter();
  const [campaignDetails, setCampaignDetails] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  useEffect(() => {
    const details = sessionStorage.getItem('campaignDetails');
    if (details) {
      setCampaignDetails(JSON.parse(details));
    } else {
      // Redirect if no campaign details are found
      router.push('/buyer/campaign/new');
    }
  }, [router]);

  useEffect(() => {
    if (state.success) {
      sessionStorage.removeItem('campaignDetails');
    }
  }, [state.success]);

  const totalAmount = campaignDetails
    ? (campaignDetails.numberOfTasks * campaignDetails.rewardPerTask).toFixed(2)
    : '0.00';

  if (!campaignDetails) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (state.success) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
             <Card className="w-full max-w-md">
                <CardContent className="p-8">
                     <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                        <h2 className="text-2xl font-bold">Payment Successful!</h2>
                        <p className="text-muted-foreground">
                            Your campaign "{campaignDetails.campaignName}" is now live.
                            The total amount of ${totalAmount} has been charged.
                        </p>
                        <Button onClick={() => router.push('/buyer/dashboard')}>
                            Back to Dashboard
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Complete Your Payment</CardTitle>
          <CardDescription>
            Securely pay to launch your "{campaignDetails.campaignName}" campaign.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 rounded-lg border bg-muted/50 p-4">
            <div className="mb-2 flex justify-between text-lg font-bold">
              <span>Total Amount:</span>
              <span>${totalAmount}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {campaignDetails.numberOfTasks} tasks × ${campaignDetails.rewardPerTask.toFixed(2)} / task
            </p>
          </div>
          <form action={formAction} className="space-y-6">
            <input type="hidden" name="amount" value={totalAmount} />
            <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a payment method" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="credit-card">Credit / Debit Card</SelectItem>
                        <SelectItem value="upi">UPI / QR Code</SelectItem>
                        <SelectItem value="net-banking">Net Banking</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {paymentMethod === 'credit-card' && (
                <div className="space-y-4 rounded-md border p-4">
                    <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry</Label>
                            <Input id="expiryDate" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                        </div>
                    </div>
                </div>
            )}

            {paymentMethod === 'upi' && (
                <div className="space-y-4 rounded-md border p-4 text-center">
                    <p className="font-semibold">Scan to Pay</p>
                    <div className="flex justify-center">
                         <img src="https://placehold.co/200x200.png?text=Scan+Me" alt="QR Code" data-ai-hint="QR code" />
                    </div>
                    <p className="text-sm text-muted-foreground">Or enter your UPI ID below</p>
                     <div className="space-y-2">
                        <Label htmlFor="upiId" className="sr-only">UPI ID</Label>
                        <Input id="upiId" placeholder="yourname@bank" />
                    </div>
                </div>
            )}
             {paymentMethod === 'net-banking' && (
                <div className="space-y-4 rounded-md border p-4">
                     <div className="space-y-2">
                        <Label>Select Your Bank</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose your bank" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bank1">HDFC Bank</SelectItem>
                                <SelectItem value="bank2">ICICI Bank</SelectItem>
                                <SelectItem value="bank3">State Bank of India</SelectItem>
                                <SelectItem value="bank4">Axis Bank</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            )}

            <SubmitButton />
          </form>
        </CardContent>
        <CardFooter className="flex-col items-center gap-2">
            <div className="flex items-center text-xs text-muted-foreground">
                <ShieldCheck className="mr-1 h-4 w-4 text-green-600" />
                <span>Secure payments powered by a simulated gateway.</span>
            </div>
             <Button variant="link" size="sm" onClick={() => router.back()}>Cancel Payment</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
