import { type SimpleTaskType } from '@/lib/types';
import { Clapperboard } from 'lucide-react';
import { SimpleTask } from './simple-task';

const tasks: SimpleTaskType[] = [
  { id: 4, question: 'What is your age?', reward: 8.0 },
  { id: 5, question: 'What is your favorite movie genre?', reward: 8.0 },
  { id: 6, question: 'What brand of phone do you use?', reward: 8.0 },
];

export function WatchAndEarn() {
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <SimpleTask key={task.id} task={task} adType="video" />
        ))}
      </div>
    </section>
  );
}
