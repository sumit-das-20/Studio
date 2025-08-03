'use client';

import { SimpleTaskType } from '@/lib/types';
import { MousePointerClick } from 'lucide-react';
import { SimpleTask } from './simple-task';
import { useMockData } from '@/hooks/use-mock-data';
import { useMemo, useState } from 'react';

export function ClickAndEarn() {
  const { allTasks } = useMockData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const tasks = useMemo(() => {
    return allTasks
      .filter(task => task.type === 'Click and Earn')
      .map(task => ({
        id: task.id,
        question: task.question || 'No question provided',
        reward: task.reward,
        adUnitId: task.adUnitId,
      })) as SimpleTaskType[];
  }, [allTasks]);

  const handleNextTask = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const currentTask = tasks[currentIndex];

  return (
    <section id="click-earn">
      <div className="mb-4 flex items-center gap-4">
        <MousePointerClick className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold font-headline">Click & Earn</h2>
          <p className="text-muted-foreground">
            Complete simple tasks to earn rewards. An ad will be shown after each task.
          </p>
        </div>
      </div>
       {currentTask ? (
         <SimpleTask key={currentTask.id} task={currentTask} adType="banner" onComplete={handleNextTask} />
        ) : (
        <div className="text-center text-muted-foreground py-12">
            <p>No more tasks available at the moment. Please check back later.</p>
        </div>
        )}
    </section>
  );
}
