
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CheckCircle, ExternalLink, Loader2, UploadCloud } from 'lucide-react';
import { type SocialTask } from '@/lib/types';
import { Label } from '../ui/label';
import { useMockData } from '@/hooks/use-mock-data';

type TaskStatus = 'idle' | 'started' | 'submitted' | 'completed';

type SocialTaskCardProps = {
  task: SocialTask;
};

export function SocialTaskCard({ task }: SocialTaskCardProps) {
  const [status, setStatus] = useState<TaskStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const { completeSocialTask } = useMockData();

  const handleStartTask = () => {
    // In a real app, you would open the link to the buyer's page
    window.open(task.link, '_blank');
    setStatus('started');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmitProof = () => {
    if (!file) {
      alert('Please upload a screenshot.');
      return;
    }
    
    setStatus('submitted');
    
    // Simulate verification delay
    setTimeout(() => {
      // In a real app, this would be based on the backend verification result.
      const isVerified = true; 

      if (isVerified) {
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
        // Handle failed verification
        alert('Verification failed. Please try again.');
        setStatus('started'); // Allow user to resubmit
      }
    }, 2000); // 2-second delay
  };

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
            {status === 'completed' && (
                 <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary bg-primary/5 p-4 text-center">
                    <CheckCircle className="h-10 w-10 text-primary" />
                    <p className="font-bold text-primary">Task Verified!</p>
                </div>
            )}

            {status !== 'completed' && (
                <div className="space-y-4">
                    <Button 
                        className="w-full" 
                        onClick={handleStartTask} 
                        disabled={status !== 'idle'}
                        variant={status !== 'idle' ? 'secondary' : 'default'}
                    >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {status === 'idle' ? 'Start Task' : 'Task Started'}
                    </Button>

                    {status === 'started' && (
                        <div className="space-y-2">
                            <Label htmlFor={`proof-${task.id}`} className="text-xs font-medium text-muted-foreground">Upload Proof (Screenshot)</Label>
                            <Input id={`proof-${task.id}`} type="file" accept="image/*" onChange={handleFileChange} />
                        </div>
                    )}
                </div>
            )}
        </CardContent>
        <CardFooter>
            {status === 'started' && (
                <Button className="w-full" onClick={handleSubmitProof} disabled={!file}>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Submit for Verification
                </Button>
            )}
            {status === 'submitted' && (
                <Button className="w-full" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                </Button>
            )}
        </CardFooter>
    </Card>
  );
}
