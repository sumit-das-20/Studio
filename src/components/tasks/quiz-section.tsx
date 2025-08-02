'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, HelpCircle, Loader2 } from 'lucide-react';
import { type QuizTask } from '@/lib/types';
import Image from 'next/image';

const quizTasks: QuizTask[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    reward: 6.0,
  },
];

export function QuizSection() {
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<number>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, task: QuizTask) => {
    e.preventDefault();
    if (completedQuizzes.has(task.id)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setCompletedQuizzes(new Set(completedQuizzes).add(task.id));
      window.dispatchEvent(new CustomEvent('earn', { detail: { amount: task.reward } }));
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="quiz-section">
      <div className="mb-4 flex items-center gap-4">
        <HelpCircle className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold font-headline">Quiz Time</h2>
          <p className="text-muted-foreground">Answer quizzes to earn. An ad is shown after each submission.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {quizTasks.map((task) => {
          const isCompleted = completedQuizzes.has(task.id);
          return (
            <Card key={task.id} className="flex h-full flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Quiz #{task.id}</span>
                   <span className="text-sm font-medium text-primary">+₹{task.reward.toFixed(2)}</span>
                </CardTitle>
                <CardDescription>{task.question}</CardDescription>
              </CardHeader>
              <form onSubmit={(e) => handleSubmit(e, task)}>
                <CardContent className="flex-grow">
                  {isCompleted ? (
                    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-primary bg-primary/5 p-6 text-center">
                      <CheckCircle className="h-12 w-12 text-primary" />
                      <h3 className="font-bold text-primary">Answer Submitted!</h3>
                       <div className="relative w-full overflow-hidden rounded-md border bg-muted p-2 mt-4">
                          <Image
                            src={"https://placehold.co/300x100.png"}
                            width={300}
                            height={100}
                            alt="Ad placeholder"
                            data-ai-hint="advertisement banner"
                            className="w-full h-auto"
                          />
                           <p className="text-center text-xs text-muted-foreground mt-1">Banner Ad</p>
                        </div>
                    </div>
                  ) : (
                    <RadioGroup defaultValue={task.options[0]} className="space-y-2">
                      {task.options.map((option) => (
                        <div key={option} className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-accent/50">
                          <RadioGroupItem value={option} id={`${task.id}-${option}`} />
                          <Label htmlFor={`${task.id}-${option}`} className="flex-1 cursor-pointer">{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </CardContent>
                <CardFooter>
                  {!isCompleted && (
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-accent hover:bg-accent/90">
                      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit Answer'}
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
