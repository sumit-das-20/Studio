
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
import { Loader2, Sparkles, CreditCard, Users, IndianRupee, Link as LinkIcon, Briefcase } from 'lucide-react';
import { createCampaign } from '../../actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const initialState = {
  success: false,
  error: null,
  data: null,
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
                        Set up the details for your new advertising campaign.
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

                        <div className="space-y-2">
                            <Label htmlFor="campaignName">Campaign Name</Label>
                            <Input id="campaignName" name="campaignName" placeholder="e.g., Summer Sale Promotion" />
                            {state.error?.campaignName && <p className="text-sm text-destructive">{state.error.campaignName[0]}</p>}
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="serviceType">Select Service</Label>
                            <Select name="serviceType">
                                <SelectTrigger id="serviceType">
                                    <SelectValue placeholder="Select a service to purchase" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="YouTube Subscribers">YouTube Subscribers</SelectItem>
                                    <SelectItem value="Instagram Followers">Instagram Followers</SelectItem>
                                    <SelectItem value="Facebook Page Likes">Facebook Page Likes</SelectItem>
                                </SelectContent>
                            </Select>
                            {state.error?.serviceType && <p className="text-sm text-destructive">{state.error.serviceType[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="targetLink">Target Link</Label>
                            <Input id="targetLink" name="targetLink" placeholder="e.g., https://youtube.com/your-channel" />
                            {state.error?.targetLink && <p className="text-sm text-destructive">{state.error.targetLink[0]}</p>}
                        </div>
                         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="numberOfTasks">Number of Tasks (e.g., Followers/Likes)</Label>
                                <Input id="numberOfTasks" name="numberOfTasks" type="number" placeholder="e.g., 1000" />
                                {state.error?.numberOfTasks && <p className="text-sm text-destructive">{state.error.numberOfTasks[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rewardPerTask">Reward per Task (in INR)</Label>
                                <Input id="rewardPerTask" name="rewardPerTask" type="number" step="0.01" placeholder="e.g., 5.00" />
                                {state.error?.rewardPerTask && <p className="text-sm text-destructive">{state.error.rewardPerTask[0]}</p>}
                            </div>
                        </div>
                       
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
