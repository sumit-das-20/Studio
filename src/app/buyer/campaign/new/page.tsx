
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
import { Loader2, Sparkles, CheckCircle } from 'lucide-react';
import { createCampaign } from '../../actions';
import { useToast } from '@/hooks/use-toast';

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
          Creating Campaign...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Launch Campaign
        </>
      )}
    </Button>
  );
}

export default function NewCampaignPage() {
  const [state, formAction] = useActionState(createCampaign, initialState);
  const { toast } = useToast();

   useEffect(() => {
    if (state.success) {
      toast({
        title: 'Campaign Created!',
        description: 'Your new campaign has been launched successfully.',
      });
    }
  }, [state.success, toast]);


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
                    {state.success ? (
                         <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-primary bg-primary/5 p-8 text-center">
                            <CheckCircle className="h-12 w-12 text-primary" />
                            <h3 className="text-xl font-bold text-primary">Campaign Launched!</h3>
                            <p className="text-muted-foreground">Your campaign is now live and will be shown to employees.</p>
                            <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">
                                Create Another Campaign
                            </Button>
                        </div>
                    ) : (
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

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="campaignGoal">Campaign Goal</Label>
                                    <Select name="campaignGoal">
                                        <SelectTrigger id="campaignGoal">
                                            <SelectValue placeholder="Select a goal" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="increase-followers">Increase Followers</SelectItem>
                                            <SelectItem value="website-clicks">Website Clicks</SelectItem>
                                            <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                                            <SelectItem value="video-views">Video Views</SelectItem>
                                        </SelectContent>
                                    </Select>
                                     {state.error?.campaignGoal && <p className="text-sm text-destructive">{state.error.campaignGoal[0]}</p>}
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="targetAudience">Target Audience</Label>
                                    <Select name="targetAudience">
                                        <SelectTrigger id="targetAudience">
                                            <SelectValue placeholder="Select an audience" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Users</SelectItem>
                                            <SelectItem value="gamers">Gamers</SelectItem>
                                            <SelectItem value="students">Students</SelectItem>
                                            <SelectItem value="tech-enthusiasts">Tech Enthusiasts</SelectItem>
                                            <SelectItem value="fashion-lovers">Fashion Lovers</SelectItem>
                                        </SelectContent>
                                    </Select>
                                     {state.error?.targetAudience && <p className="text-sm text-destructive">{state.error.targetAudience[0]}</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="budget">Budget (in USD)</Label>
                                <Input id="budget" name="budget" type="number" placeholder="e.g., 100" />
                                 {state.error?.budget && <p className="text-sm text-destructive">{state.error.budget[0]}</p>}
                            </div>
                           
                            <SubmitButton />
                        </form>
                    )}
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
