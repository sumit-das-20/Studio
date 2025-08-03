'use client';

import { type SimpleTaskType } from '@/lib/types';
import { Clapperboard } from 'lucide-react';
import { SimpleTask } from './simple-task';
import { useMockData } from '@/hooks/use-mock-data';
import { useMemo, useState } from 'react';

export function WatchAndEarn() {
  const { allTasks } = useMockData();
  const [currentIndex, setCurrentIndex] = useState(0);

  const tasks = useMemo(() => {
    return allTasks
      .filter(task => task.type === 'Watch and Earn')
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
    <section id="watch-earn">
       <div className="mb-4 flex items-center gap-4">
        <Clapperboard className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold font-headline">Watch & Earn</h2>
          <p className="text-muted-foreground">
            Complete simple tasks to watch a video ad and earn rewards.
          </p>
        </div>
      </div>
      {currentTask ? (
        <SimpleTask key={currentTask.id} task={currentTask} adType="video" onComplete={handleNextTask}/>
      ) : (
        <div className="text-center text-muted-foreground py-12">
          <p>No more tasks available at the moment. Please check back later.</p>
        </div>
      )}
    </section>
  );
}
