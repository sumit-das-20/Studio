

'use client';

import { useActionState, useEffect, useState, useMemo } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Loader2, Sparkles, CreditCard, IndianRupee, Briefcase, HandCoins } from 'lucide-react';
import { createCampaign } from '../../actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { initialServices } from '@/lib/mock-data'; // Import mock services

const initialState = {
  success: false,
  error: null,
  data: null,
};

const serviceOptions = {
    YouTube: initialServices.filter(s => s.platform === 'YouTube'),
    Facebook: initialServices.filter(s => s.platform === 'Facebook'),
    Instagram: initialServices.filter(s => s.platform === 'Instagram'),
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Reviewing Campaign...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Review Campaign & Proceed to Payment
        </>
      )}
    </Button>
  );
}

export default function NewCampaignPage() {
  const [state, formAction] = useActionState(createCampaign, initialState);
  const { toast } = useToast();
  const router = useRouter();

  // State for dynamic form
  const [platform, setPlatform] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [quantity, setQuantity] = useState(0);

  const selectedService = useMemo(() => {
    return initialServices.find(s => s.id === serviceType);
  }, [serviceType]);

  const totalCost = useMemo(() => {
    if (selectedService && quantity > 0) {
      return selectedService.pricePerUnit * quantity;
    }
    return 0;
  }, [selectedService, quantity]);


   useEffect(() => {
    if (state.success && state.data) {
      toast({
        title: 'Campaign Details Confirmed!',
        description: 'Please proceed to payment to launch your campaign.',
      });
      // Store campaign details in session storage to pass to payment page
      sessionStorage.setItem('campaignDetails', JSON.stringify(state.data));
      router.push('/buyer/payment');
    }
  }, [state.success, state.data, toast, router]);


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
       <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
           <BackButton />
       </header>
        <main className="flex flex-1 items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Create New Campaign</CardTitle>
                    <CardDescription>
                        Set up the details for your new advertising campaign. Pricing is set by the admin.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-6">
                         {state.error && typeof state.error === 'string' && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{state.error}</AlertDescription>
                            </Alert>
                        )}
                        <input type="hidden" name="totalCost" value={totalCost} />

                        {/* Step 1: Campaign Name */}
                        <div className="space-y-2">
                            <Label htmlFor="campaignName">1. Campaign Name</Label>
                            <Input id="campaignName" name="campaignName" placeholder="e.g., Summer Sale Promotion" />
                            {state.error?.campaignName && <p className="text-sm text-destructive">{state.error.campaignName[0]}</p>}
                        </div>

                        {/* Step 2: Platform Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="platform">2. Social Media Platform</Label>
                            <Select name="platform" onValueChange={setPlatform}>
                                <SelectTrigger id="platform">
                                    <SelectValue placeholder="Select a platform..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="YouTube">YouTube</SelectItem>
                                    <SelectItem value="Facebook">Facebook</SelectItem>
                                    <SelectItem value="Instagram">Instagram</SelectItem>
                                </SelectContent>
                            </Select>
                            {state.error?.platform && <p className="text-sm text-destructive">{state.error.platform[0]}</p>}
                        </div>

                        {/* Step 3: Service Selection (Dynamic) */}
                        {platform && (
                            <div className="space-y-2">
                                <Label htmlFor="serviceType">3. Select Service</Label>
                                <Select name="serviceType" onValueChange={setServiceType}>
                                    <SelectTrigger id="serviceType">
                                        <SelectValue placeholder={`Select a service for ${platform}...`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {serviceOptions[platform as keyof typeof serviceOptions]?.map(service => (
                                            <SelectItem key={service.id} value={service.id}>
                                                {service.serviceName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {state.error?.serviceType && <p className="text-sm text-destructive">{state.error.serviceType[0]}</p>}
                            </div>
                        )}

                        {/* Step 4: Target Link */}
                        {serviceType && (
                            <div className="space-y-2">
                                <Label htmlFor="targetLink">4. Target Link</Label>
                                <Input id="targetLink" name="targetLink" placeholder={`e.g., https://${platform.toLowerCase()}.com/your-details`} />
                                {state.error?.targetLink && <p className="text-sm text-destructive">{state.error.targetLink[0]}</p>}
                            </div>
                        )}

                        {/* Step 5: Quantity & Cost */}
                        {serviceType && (
                             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">5. Quantity ({selectedService?.unit})</Label>
                                    <Input id="quantity" name="quantity" type="number" placeholder="e.g., 1000" onChange={e => setQuantity(Number(e.target.value))} />
                                    {state.error?.quantity && <p className="text-sm text-destructive">{state.error.quantity[0]}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Estimated Total Cost</Label>
                                    <div className="flex h-10 w-full items-center rounded-md border border-input bg-muted px-3 py-2 text-sm">
                                        <HandCoins className="mr-2 h-5 w-5 text-muted-foreground" />
                                        <span className="font-bold">₹{totalCost.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                       
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
