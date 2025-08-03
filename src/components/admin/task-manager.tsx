
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Edit, PlusCircle, Trash } from 'lucide-react';
import { AdminTask } from '@/lib/types';
import { NewTaskDialog } from './new-task-dialog';
import { useState } from 'react';

// This is a representation of tasks fetched from the database.
const initialTasks: AdminTask[] = [
  {
    id: 'TASK-001',
    question: 'What is your primary hobby?',
    reward: 0.25,
    adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    type: 'Click and Earn',
    createdAt: '2024-07-30',
  },
  {
    id: 'TASK-002',
    question: 'What brand of phone do you use?',
    reward: 0.75,
    adUnitId: 'ca-app-pub-3940256099942544/2247696110',
    type: 'Watch and Earn',
    createdAt: '2024-07-29',
  },
];

export function TaskManager() {
  const [tasks, setTasks] = useState<AdminTask[]>(initialTasks);

  const handleTaskCreated = (newTask: AdminTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Platform Task Management</CardTitle>
          <CardDescription>
            Create, edit, and manage all tasks available to users.
          </CardDescription>
        </div>
         <NewTaskDialog onTaskCreated={handleTaskCreated} />
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Question</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Reward (INR)</TableHead>
                <TableHead>Ad Unit ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.question}</TableCell>
                  <TableCell>
                    <Badge variant={task.type === 'Click and Earn' ? 'secondary' : 'default'}>{task.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{task.reward.toFixed(2)}</TableCell>
                  <TableCell className="font-mono text-xs">{task.adUnitId}</TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit Task</span>
                        </Button>
                        <Button variant="destructive" size="icon" className="h-8 w-8">
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete Task</span>
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            <p>No tasks created yet.</p>
            <NewTaskDialog onTaskCreated={handleTaskCreated} isFirstTask={true} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
