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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '../ui/badge';
import { AdminTask } from '@/lib/types';
import { TaskDialog } from './new-task-dialog';
import { useState, useMemo } from 'react';
import { DeleteTaskDialog } from './delete-task-dialog';
import { Facebook, Instagram, Youtube, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useMockData } from '@/hooks/use-mock-data';

const TASKS_PER_PAGE = 10;

const TaskTable = ({ tasks, onTaskUpdated, onTaskDeleted, onTaskCreated }: { tasks: AdminTask[], onTaskUpdated: (task: AdminTask) => void, onTaskDeleted: (taskId: string) => void, onTaskCreated: (task: AdminTask) => void }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tasks.length / TASKS_PER_PAGE);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
    const endIndex = startIndex + TASKS_PER_PAGE;
    return tasks.slice(startIndex, endIndex);
  }, [tasks, currentPage]);


  const platformIcons = {
    YouTube: <Youtube className="h-5 w-5 text-red-600" />,
    Facebook: <Facebook className="h-5 w-5 text-blue-600" />,
    Instagram: <Instagram className="h-5 w-5 text-pink-600" />,
  };
  
  if (tasks.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        <p>No tasks found for this category.</p>
        <TaskDialog onTaskCreated={onTaskCreated} onTaskUpdated={onTaskUpdated} isFirstTask={true} />
      </div>
    );
  }

  return (
    <>
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
          {paginatedTasks.map((task) => (
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
                    <TaskDialog onTaskCreated={onTaskCreated} onTaskUpdated={onTaskUpdated} task={task} />
                    <DeleteTaskDialog taskId={task.id} onTaskDeleted={onTaskDeleted} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
            Page {currentPage} of {totalPages} ({tasks.length} total tasks)
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className='ml-2'>Previous</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <span className='mr-2'>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
};

export function TaskManager() {
  const { allTasks, addAdminTask, updateAdminTask, deleteAdminTask } = useMockData();

  const handleTaskCreated = (newTask: AdminTask) => {
    addAdminTask(newTask);
  };

  const handleTaskUpdated = (updatedTask: AdminTask) => {
    updateAdminTask(updatedTask);
  };

  const handleTaskDeleted = (taskId: string) => {
    deleteAdminTask(taskId);
  }

  const filteredTasks = (type: AdminTask['type'] | AdminTask['type'][]) => {
      const types = Array.isArray(type) ? type : [type];
      return allTasks.filter(task => types.includes(task.type));
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
         <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="simple">Click/Watch</TabsTrigger>
                <TabsTrigger value="links">Link Shortener</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                 <TaskTable tasks={allTasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} onTaskCreated={handleTaskCreated} />
            </TabsContent>
            <TabsContent value="simple">
                 <TaskTable tasks={filteredTasks(['Click and Earn', 'Watch and Earn'])} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} onTaskCreated={handleTaskCreated} />
            </TabsContent>
             <TabsContent value="links">
                 <TaskTable tasks={filteredTasks('Link Shortener')} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} onTaskCreated={handleTaskCreated} />
            </TabsContent>
             <TabsContent value="quiz">
                 <TaskTable tasks={filteredTasks('Quiz')} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} onTaskCreated={handleTaskCreated} />
            </TabsContent>
             <TabsContent value="social">
                 <TaskTable tasks={filteredTasks('Social Media')} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted} onTaskCreated={handleTaskCreated} />
            </TabsContent>
         </Tabs>
      </CardContent>
    </Card>
  );
}
