import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type SimpleTaskType } from '@/lib/types';
import { MousePointerClick } from 'lucide-react';
import { SimpleTask } from './simple-task';

const tasks: SimpleTaskType[] = [
  { id: 1, question: 'Enter Your Full Name.', reward: 4.15 },
  { id: 2, question: 'What is your primary hobby?', reward: 4.15 },
  { id: 3, question: 'What city do you live in?', reward: 4.15 },
];

export function ClickAndEarn() {
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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <SimpleTask key={task.id} task={task} adType="banner" />
        ))}
      </div>
    </section>
  );
}
