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

// Rewards would be fetched from the backend based on the campaign.
const tasks: SimpleTaskType[] = [
  { id: 1, question: 'Enter Your Full Name.', reward: 1.0 },
  { id: 2, question: 'What is your primary hobby?', reward: 1.0 },
  { id: 3, question: 'What city do you live in?', reward: 1.2 },
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
