import { type SimpleTaskType } from '@/lib/types';
import { Clapperboard } from 'lucide-react';
import { SimpleTask } from './simple-task';

// In a real application, this data would be fetched from a backend
// where tasks are created and managed by an administrator.
const tasks: SimpleTaskType[] = [
  { id: 4, question: 'What is your age?' },
  { id: 5, question: 'What is your favorite movie genre?' },
  { id: 6, question: 'What brand of phone do you use?' },
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
