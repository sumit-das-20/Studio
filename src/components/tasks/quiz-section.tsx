'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, HelpCircle, Loader2 } from 'lucide-react';
import { type QuizTask } from '@/lib/types';
import Image from 'next/image';
import { useMockData } from '@/hooks/use-mock-data';

export function QuizSection() {
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<string>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
  const { allTasks } = useMockData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const quizTasks = useMemo(() => {
      return allTasks
        .filter(task => task.type === 'Quiz')
        .map(task => ({
            id: task.id,
            question: task.question || 'No question',
            options: task.options || [],
            reward: task.reward,
        })) as QuizTask[];
  }, [allTasks]);

  const handleNextTask = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, task: QuizTask) => {
    e.preventDefault();
    if (completedQuizzes.has(task.id)) return;

    setIsSubmitting(task.id);
    setTimeout(() => {
      setCompletedQuizzes(new Set(completedQuizzes).add(task.id));
      if (task.reward) {
        window.dispatchEvent(new CustomEvent('earn', { detail: { amount: task.reward } }));
      }
      setIsSubmitting(null);
      // We don't automatically go to the next quiz here, the ad banner shows first.
      // A "Next Quiz" button could be added if desired.
    }, 1000);
  };

  const currentTask = quizTasks[currentIndex];
  if (!currentTask && quizTasks.length > 0) {
     return (
        <div className="text-center text-muted-foreground py-12">
            <p>You have completed all available quizzes. Great job!</p>
        </div>
     )
  }

  return (
    <section id="quiz-section">
      <div className="mb-4 flex items-center gap-4">
        <HelpCircle className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold font-headline">Quiz Time</h2>
          <p className="text-muted-foreground">Answer quizzes to earn. An ad is shown after each submission.</p>
        </div>
      </div>
      {currentTask ? (
        <Card key={currentTask.id} className="flex h-full flex-col">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Quiz #{currentIndex + 1}</span>
              {currentTask.reward && (
                <span className="text-sm font-medium text-primary">+{currentTask.reward.toFixed(2)}</span>
              )}
            </CardTitle>
            <CardDescription>{currentTask.question}</CardDescription>
          </CardHeader>
          <form onSubmit={(e) => handleSubmit(e, currentTask)}>
            <CardContent className="flex-grow">
              {completedQuizzes.has(currentTask.id) ? (
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
                <RadioGroup defaultValue={currentTask.options[0]} className="space-y-2">
                  {currentTask.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2 rounded-md border p-3 transition-colors hover:bg-accent/50">
                      <RadioGroupItem value={option} id={`${currentTask.id}-${option}`} />
                      <Label htmlFor={`${currentTask.id}-${option}`} className="flex-1 cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </CardContent>
            <CardFooter>
              {completedQuizzes.has(currentTask.id) ? (
                  <Button onClick={handleNextTask} className="w-full">
                    Next Quiz
                  </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting === currentTask.id} className="w-full bg-accent hover:bg-accent/90">
                  {isSubmitting === currentTask.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit Answer'}
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      ) : (
        <div className="text-center text-muted-foreground py-12">
          <p>No quizzes available at the moment. Please check back later.</p>
        </div>
      )}
    </section>
  );
}
