
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
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useActionState, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createTask, updateTask } from '@/app/admin/actions';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import type { AdminTask } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

const initialState = {
  success: false,
  error: null,
  data: null,
};

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isEditing ? 'Updating...' : 'Creating...'}
        </>
      ) : (
        isEditing ? 'Save Changes' : 'Create Task'
      )}
    </Button>
  );
}

type TaskDialogProps = {
  onTaskCreated: (task: AdminTask) => void;
  onTaskUpdated: (task: AdminTask) => void;
  task?: AdminTask;
  isFirstTask?: boolean;
};

const socialTaskTypes = {
  YouTube: ['Subscribe', 'Watch Video', 'Like & Comment'],
  Facebook: ['Follow Pages', 'Watch Videos', 'Like & Comment'],
  Instagram: ['Follow Accounts', 'Like & Comment'],
};

export function TaskDialog({ onTaskCreated, onTaskUpdated, task, isFirstTask = false }: TaskDialogProps) {
  const isEditing = !!task;
  const action = isEditing ? updateTask : createTask;
  const [state, formAction] = useActionState(action, initialState);
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [taskType, setTaskType] = useState<AdminTask['type'] | undefined>(task?.type || 'Click and Earn');
  const [quizOptions, setQuizOptions] = useState<string[]>(task?.options || ['', '']);
  const [platform, setPlatform] = useState<AdminTask['platform'] | ''>(task?.platform || '');


  useEffect(() => {
    if (state.success && state.data) {
      if (isEditing) {
        onTaskUpdated({
          ...task,
          ...state.data,
        } as AdminTask);
      } else {
        onTaskCreated({
          ...state.data,
          id: `TASK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          createdAt: new Date().toISOString().split('T')[0],
        } as AdminTask);
      }
      setOpen(false);
    }
  }, [state.success, state.data, onTaskCreated, onTaskUpdated, isEditing, task]);

  // Reset form state when dialog opens or task type changes
  useEffect(() => {
    if (open) {
        if (task) {
            setTaskType(task.type);
            setQuizOptions(task.options || ['', '']);
            setPlatform(task.platform || '');
        } else {
            formRef.current?.reset();
            setTaskType('Click and Earn');
            setQuizOptions(['', '']);
            setPlatform('');
        }
    }
  }, [open, task]);

  const handleAddOption = () => setQuizOptions([...quizOptions, '']);
  const handleRemoveOption = (index: number) => setQuizOptions(quizOptions.filter((_, i) => i !== index));
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...quizOptions];
    newOptions[index] = value;
    setQuizOptions(newOptions);
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit Task</span>
          </Button>
        ) : isFirstTask ? (
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit' : 'Create'} Task</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the details for this task.' : 'Select a task type and fill out the details.'}
          </DialogDescription>
        </DialogHeader>
        {state.error && typeof state.error === 'string' && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
        <form ref={formRef} action={formAction} className="space-y-4">
          {isEditing && <input type="hidden" name="id" value={task.id} />}
          
          {/* Task Type Selector */}
          <div>
            <Label htmlFor="type">Task Type</Label>
            <Select name="type" value={taskType} onValueChange={(value) => setTaskType(value as AdminTask['type'])}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select a task type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Click and Earn">Click and Earn</SelectItem>
                <SelectItem value="Watch and Earn">Watch and Earn</SelectItem>
                <SelectItem value="Link Shortener">Link Shortener</SelectItem>
                <SelectItem value="Quiz">Quiz</SelectItem>
                <SelectItem value="Social Media">Social Media</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Dynamic Fields based on Task Type */}
          {(taskType === 'Click and Earn' || taskType === 'Watch and Earn') && (
            <>
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Textarea id="question" name="question" placeholder="e.g., What is your favorite color?" defaultValue={task?.question} />
                {state.error?.question && <p className="text-sm text-destructive mt-1">{state.error.question[0]}</p>}
              </div>
               <div className="space-y-2">
                <Label htmlFor="adUnitId">Ad Unit ID (Required)</Label>
                <Input id="adUnitId" name="adUnitId" placeholder="ca-app-pub-..." defaultValue={task?.adUnitId}/>
                {state.error?.adUnitId && <p className="text-sm text-destructive mt-1">{state.error.adUnitId[0]}</p>}
              </div>
            </>
          )}

          {taskType === 'Link Shortener' && (
            <div className="space-y-2">
              <Label htmlFor="link">Target URL</Label>
              <Input id="link" name="link" placeholder="https://example.com/short-link" defaultValue={task?.link}/>
              {state.error?.link && <p className="text-sm text-destructive mt-1">{state.error.link[0]}</p>}
            </div>
          )}

          {taskType === 'Quiz' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="question">Quiz Question</Label>
                <Textarea id="question" name="question" placeholder="e.g., What is the capital of France?" defaultValue={task?.question} />
                {state.error?.question && <p className="text-sm text-destructive mt-1">{state.error.question[0]}</p>}
              </div>
              <div className="space-y-2">
                  <Label>Answer Options</Label>
                  {quizOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Input 
                            name="options[]" 
                            placeholder={`Option ${index + 1}`} 
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveOption(index)} disabled={quizOptions.length <= 2}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  ))}
                   <Button type="button" variant="outline" size="sm" onClick={handleAddOption}>Add Option</Button>
              </div>
            </>
          )}
          
          {taskType === 'Social Media' && (
            <>
                 <div className="space-y-2">
                    <Label htmlFor="platform">Platform</Label>
                    <Select name="platform" value={platform} onValueChange={(value) => setPlatform(value as AdminTask['platform'] | '')}>
                        <SelectTrigger id="platform">
                            <SelectValue placeholder="Select a platform" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="YouTube">YouTube</SelectItem>
                            <SelectItem value="Facebook">Facebook</SelectItem>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                        </SelectContent>
                    </Select>
                     {state.error?.platform && <p className="text-sm text-destructive mt-1">{state.error.platform[0]}</p>}
                 </div>
                {platform && (
                     <div className="space-y-2">
                        <Label htmlFor="socialTaskType">Task Type</Label>
                        <Select name="socialTaskType" defaultValue={task?.socialTaskType}>
                            <SelectTrigger id="socialTaskType">
                                <SelectValue placeholder="Select a social task type" />
                            </SelectTrigger>
                            <SelectContent>
                                {socialTaskTypes[platform as keyof typeof socialTaskTypes].map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
                 <div className="space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input id="title" name="title" placeholder="e.g., Like our new post!" defaultValue={task?.title}/>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="link">Target Link</Label>
                    <Input id="link" name="link" placeholder="https://youtube.com/watch?v=..." defaultValue={task?.link}/>
                </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="reward">Reward (INR)</Label>
            <Input id="reward" name="reward" type="number" step="0.01" placeholder="e.g., 0.50" defaultValue={task?.reward} />
            {state.error?.reward && <p className="text-sm text-destructive mt-1">{state.error.reward[0]}</p>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton isEditing={isEditing} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
