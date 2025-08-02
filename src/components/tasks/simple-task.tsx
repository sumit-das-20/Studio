'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { handleTaskCompletion } from '@/app/actions';
import { type CategorizeTaskOutput } from '@/ai/flows/categorize-tasks';
import { type SimpleTaskType } from '@/lib/types';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { Badge } from '../ui/badge';
import Image from 'next/image';

const formSchema = z.object({
  answer: z.string().min(2, 'Please provide a slightly longer answer.'),
});

type SimpleTaskProps = {
  task: SimpleTaskType;
  adType: 'banner' | 'video';
};

export function SimpleTask({ task, adType }: SimpleTaskProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [aiResult, setAiResult] = useState<CategorizeTaskOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setError(null);
    startTransition(async () => {
      const result = await handleTaskCompletion(task.question, values.answer);
      if (result.success && result.data) {
        setAiResult(result.data);
        setIsCompleted(true);
        window.dispatchEvent(
          new CustomEvent('earn', { detail: { amount: task.reward } })
        );
      } else {
        setError(result.error || 'An unexpected error occurred.');
      }
    });
  };

  return (
    <Card className="flex h-full flex-col transition-all duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span>Task #{task.id}</span>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            +${task.reward.toFixed(2)}
          </Badge>
        </CardTitle>
        <CardDescription>{task.question}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {isCompleted ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-primary bg-primary/5 p-6 text-center">
            <CheckCircle className="h-12 w-12 text-primary" />
            <h3 className="font-bold text-primary">Task Completed!</h3>
            <p className="text-sm text-muted-foreground">Reward earned.</p>
            {aiResult && (
              <div className="w-full space-y-2 pt-4 text-left">
                <h4 className="flex items-center gap-2 font-semibold text-foreground">
                  <Sparkles className="h-4 w-4 text-accent" />
                  AI Ad Personalization
                </h4>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Category:</span> {aiResult.category}
                </p>
                 <div className="flex flex-wrap gap-1">
                  {aiResult.keywords.map((kw) => (
                    <Badge key={kw} variant="secondary">{kw}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Your Answer</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your answer here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} className="w-full bg-accent hover:bg-accent/90">
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Submit & Earn'
                )}
              </Button>
               {error && <p className="text-sm text-destructive">{error}</p>}
            </form>
          </Form>
        )}
      </CardContent>
      {isCompleted && (
        <CardFooter className="mt-auto">
          <div className="relative w-full overflow-hidden rounded-md border bg-muted p-2">
            <Image
              src={ adType === 'banner' ? "https://placehold.co/300x100.png" : "https://placehold.co/300x200.png"}
              width={adType === 'banner' ? 300 : 300}
              height={adType === 'banner' ? 100 : 200}
              alt="Ad placeholder"
              data-ai-hint={adType === 'banner' ? 'advertisement banner' : 'video player'}
              className="w-full h-auto"
            />
            <p className="text-center text-xs text-muted-foreground mt-1">
              {adType === 'banner' ? 'Banner Ad' : 'Video Ad'}
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
