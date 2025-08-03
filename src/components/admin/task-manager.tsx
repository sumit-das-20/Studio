
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
import { AdminTask } from '@/lib/types';
import { TaskDialog } from './new-task-dialog';
import { useState } from 'react';
import { DeleteTaskDialog } from './delete-task-dialog';
import { Facebook, Instagram, Youtube } from 'lucide-react';

// This is a representation of tasks fetched from the database.
const initialTasks: AdminTask[] = [
  {
    id: 'TASK-001',
    type: 'Click and Earn',
    question: 'What is your primary hobby?',
    reward: 0.25,
    adUnitId: 'ca-app-pub-3940256099942544/6300978111',
    createdAt: '2024-07-30',
  },
  {
    id: 'TASK-002',
    type: 'Watch and Earn',
    question: 'What brand of phone do you use?',
    reward: 0.75,
    adUnitId: 'ca-app-pub-3940256099942544/2247696110',
    createdAt: '2024-07-29',
  },
  {
    id: 'TASK-003',
    type: 'Quiz',
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Jupiter', 'Mars', 'Saturn'],
    reward: 1.50,
    createdAt: '2024-07-28',
  },
  {
    id: 'TASK-004',
    type: 'Social Media',
    platform: 'YouTube',
    socialTaskType: 'Subscribe',
    title: 'Subscribe to our YouTube Channel',
    link: 'https://youtube.com/example',
    reward: 2.00,
    createdAt: '2024-07-27',
  }
];

export function TaskManager() {
  const [tasks, setTasks] = useState<AdminTask[]>(initialTasks);

  const handleTaskCreated = (newTask: AdminTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const handleTaskUpdated = (updatedTask: AdminTask) => {
    setTasks(prevTasks => 
        prevTasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        )
    );
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }
  
  const platformIcons = {
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
    Facebook: <Facebook className="h-5 w-5 text-blue-600" />,
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Platform Task Management</CardTitle>
          <CardDescription>
            Create, edit, and manage all tasks available to users.
          </CardDescription>
        </div>
         <TaskDialog onTaskCreated={handleTaskCreated} onTaskUpdated={handleTaskUpdated}/>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Reward (INR)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>
                    <Badge variant={
                        task.type === 'Social Media' ? 'default' :
                        task.type === 'Quiz' ? 'accent' as any :
                        'secondary'
                    }>{task.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                        {task.type === 'Social Media' && task.platform && (
                            <div className="flex items-center gap-2">
                                {platformIcons[task.platform as keyof typeof platformIcons]}
                                <span className="font-semibold">{task.title}</span>
                            </div>
                        )}
                        {(task.type === 'Click and Earn' || task.type === 'Watch and Earn' || task.type === 'Quiz') && (
                            <p className="font-semibold">{task.question}</p>
                        )}
                         {task.link && (
                             <a href={task.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-500 hover:underline truncate max-w-xs">{task.link}</a>
                         )}
                         {task.adUnitId && (
                            <p className="font-mono text-xs text-muted-foreground">{task.adUnitId}</p>
                         )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{task.reward.toFixed(2)}</TableCell>
                  <TableCell>
                     <div className="flex items-center gap-2">
                        <TaskDialog onTaskCreated={handleTaskCreated} onTaskUpdated={handleTaskUpdated} task={task} />
                        <DeleteTaskDialog taskId={task.id} onTaskDeleted={handleTaskDeleted} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            <p>No tasks created yet.</p>
            <TaskDialog onTaskCreated={handleTaskCreated} onTaskUpdated={handleTaskUpdated} isFirstTask={true} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
