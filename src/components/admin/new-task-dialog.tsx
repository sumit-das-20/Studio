
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button, buttonVariants } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { PlusCircle } from 'lucide-react';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createTask } from '@/app/admin/actions';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { cn } from '@/lib/utils';
import type { AdminTask } from '@/lib/types';


const initialState = {
  success: false,
  error: null,
  data: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating Task...
        </>
      ) : (
        'Create Task'
      )}
    </Button>
  );
}

type NewTaskDialogProps = {
    onTaskCreated: (task: AdminTask) => void;
    isFirstTask?: boolean;
}

export function NewTaskDialog({ onTaskCreated, isFirstTask = false }: NewTaskDialogProps) {
  const [state, formAction] = useActionState(createTask, initialState);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && state.data) {
        onTaskCreated({
            ...state.data,
            id: `TASK-${Math.floor(Math.random() * 1000)}`, // Simulate ID generation
            type: 'Click and Earn', // For now, only one type
            createdAt: new Date().toISOString().split('T')[0],
        } as AdminTask)
      setOpen(false);
      formRef.current?.reset();
    }
  }, [state.success, state.data, onTaskCreated]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isFirstTask ? (
             <Button variant="link" className="mt-2">
                Create the first task
            </Button>
        ) : (
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Task
            </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Fill out the details for the new task. It will be available to users immediately.
          </DialogDescription>
        </DialogHeader>
         {state.error && typeof state.error === 'string' && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}
        <form ref={formRef} action={formAction} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="question" className="text-right">
              Question
            </Label>
            <div className="col-span-3">
                <Input id="question" name="question" placeholder="e.g., What is your favorite color?" />
                {state.error?.question && <p className="text-sm text-destructive mt-1">{state.error.question[0]}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reward" className="text-right">
              Reward (INR)
            </Label>
            <div className="col-span-3">
                <Input id="reward" name="reward" type="number" step="0.01" placeholder="e.g., 0.50" />
                {state.error?.reward && <p className="text-sm text-destructive mt-1">{state.error.reward[0]}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="adUnitId" className="text-right">
              Ad Unit ID
            </Label>
            <div className="col-span-3">
                <Input id="adUnitId" name="adUnitId" placeholder="ca-app-pub-..." />
                 {state.error?.adUnitId && <p className="text-sm text-destructive mt-1">{state.error.adUnitId[0]}</p>}
            </div>
          </div>
           <DialogFooter>
             <DialogClose asChild>
                <Button type="button" variant="secondary">
                    Cancel
                </Button>
            </DialogClose>
            <SubmitButton />
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
