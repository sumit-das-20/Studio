
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Trash } from 'lucide-react';
import { useTransition } from 'react';
import { deleteTask } from '@/app/admin/actions';
import { useToast } from '@/hooks/use-toast';

type DeleteTaskDialogProps = {
  taskId: string;
  onTaskDeleted: (taskId: string) => void;
};

export function DeleteTaskDialog({ taskId, onTaskDeleted }: DeleteTaskDialogProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTask(taskId);
      if (result.success) {
        onTaskDeleted(taskId);
        toast({
          title: 'Task Deleted',
          description: `Task ${taskId} has been successfully deleted.`,
        });
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Failed to delete the task.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" className="h-8 w-8">
          <Trash className="h-4 w-4" />
          <span className="sr-only">Delete Task</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task
            and remove it from the platform.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
