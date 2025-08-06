
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle, ExternalLink, Loader2, UploadCloud, XCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { type SocialTask } from '@/lib/types';
import { Label } from '../ui/label';
import { useMockData } from '@/hooks/use-mock-data';
import { verifySocialTaskScreenshot } from '@/ai/flows/verify-screenshot-flow';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

type TaskStatus = 'idle' | 'started' | 'submitted' | 'completed' | 'failed';

type SocialTaskCardProps = {
  task: SocialTask;
};

export function SocialTaskCard({ task }: SocialTaskCardProps) {
  const [status, setStatus] = useState<TaskStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [aiJustification, setAiJustification] = useState('');
  const { completeSocialTask } = useMockData();

  const handleStartTask = () => {
    window.open(task.link, '_blank');
    setStatus('started');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const toDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

  const handleSubmitProof = async () => {
    if (!file) {
      alert('Please upload a screenshot.');
      return;
    }
    
    setStatus('submitted');
    
    const screenshotDataUri = await toDataURL(file);

    const verification = await verifySocialTaskScreenshot({
        screenshotDataUri,
        taskInstructions: `Complete the task: "${task.type}" for the content at the target URL.`,
        targetUrl: task.link,
        // In a real app, this info would come from the logged-in user's session
        employeeInfo: "Employee ID: EMP-001, Email: john.doe@example.com"
    });

    setAiJustification(verification.justification);

    if (verification.isValid) {
      setStatus('completed');
      if (task.reward) {
        window.dispatchEvent(
          new CustomEvent('earn', { detail: { amount: task.reward } })
        );
      }
      if (task.id && task.campaignId) {
          completeSocialTask(task.id, task.campaignId);
      }
    } else {
      setStatus('failed');
      // This is the simulated "warning notification"
      alert(`Warning: Your submission was rejected by our AI verifier for the following reason: ${verification.justification}. Please submit valid proof to avoid account suspension.`);
    }
  };

  const renderContent = () => {
    switch(status) {
        case 'completed':
            return (
                <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary bg-primary/5 p-4 text-center">
                    <CheckCircle className="h-10 w-10 text-primary" />
                    <p className="font-bold text-primary">Task Verified!</p>
                    <p className="text-xs text-muted-foreground">{aiJustification}</p>
                </div>
            );
        case 'failed':
            return (
                 <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>Verification Failed</AlertTitle>
                    <AlertDescription className="text-xs">
                        {aiJustification}
                    </AlertDescription>
                     <Button variant="link" size="sm" className="p-0 h-auto mt-2" onClick={() => { setStatus('started'); setFile(null); }}>
                        Try Again
                    </Button>
                </Alert>
            );
        default:
             return (
                <div className="space-y-4">
                    <Button 
                        className="w-full" 
                        onClick={handleStartTask} 
                        disabled={status !== 'idle'}
                        variant={status !== 'idle' ? 'secondary' : 'default'}
                    >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {status === 'idle' ? 'Step 1: Open Link' : 'Link Opened'}
                    </Button>

                    {status !== 'idle' && (
                        <div className="space-y-2">
                            <Label htmlFor={`proof-${task.id}`} className="text-xs font-medium text-muted-foreground">Step 2: Upload Proof</Label>
                            <Input id={`proof-${task.id}`} type="file" accept="image/*" onChange={handleFileChange} />
                        </div>
                    )}
                </div>
            );
    }
  }

  const renderFooter = () => {
      switch(status) {
        case 'started':
             return (
                <Button className="w-full" onClick={handleSubmitProof} disabled={!file}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Submit for AI Verification
                </Button>
            );
        case 'submitted':
            return (
                <Button className="w-full" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying with AI...
                </Button>
            );
        default:
            return null;
      }
  }

  return (
    <Card className="flex flex-col">
        <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <span className="text-base">{task.type}</span>
                {task.reward != null && <Badge variant="secondary">+{task.reward.toFixed(2)}</Badge>}
            </CardTitle>
            <CardDescription>{task.title}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            {renderContent()}
        </CardContent>
        <CardFooter>
            {renderFooter()}
        </CardFooter>
    </Card>
  );
}
