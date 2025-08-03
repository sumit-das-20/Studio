'use client';

import { SimpleTaskType } from '@/lib/types';
import { MousePointerClick } from 'lucide-react';
import { SimpleTask } from './simple-task';
import { useMockData } from '@/hooks/use-mock-data';
import { useMemo } from 'react';

export function ClickAndEarn() {
  const { allTasks } = useMockData();

  const tasks = useMemo(() => {
    return allTasks
      .filter(task => task.type === 'Click and Earn')
      .map(task => ({
        id: parseInt(task.id.split('-')[1]), // Maintain numeric ID for compatibility
        question: task.question || 'No question provided',
        reward: task.reward,
        adUnitId: task.adUnitId,
      })) as SimpleTaskType[];
  }, [allTasks]);


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
       {tasks && tasks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
            <SimpleTask key={task.id} task={task} adType="banner" />
            ))}
        </div>
        ) : (
        <div className="text-center text-muted-foreground py-12">
            <p>No tasks available at the moment. Please check back later.</p>
        </div>
        )}
    </section>
  );
}
