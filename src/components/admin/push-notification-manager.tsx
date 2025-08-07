
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Bell, Loader2, Send } from 'lucide-react';
import { Badge } from '../ui/badge';
import { formatDistanceToNow } from 'date-fns';

type Notification = {
  id: string;
  title: string;
  message: string;
  sentAt: Date;
};

type FormData = {
  title: string;
  message: string;
};

const notificationSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

// A new client component to safely render the relative time
const TimeAgo = ({ date }: { date: Date }) => {
    const [timeAgo, setTimeAgo] = useState('');

    useState(() => {
        setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
    });

    return <Badge variant="outline">{timeAgo}</Badge>;
}


export function PushNotificationManager() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(notificationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsSending(true);

    // Simulate API call to send notification
    setTimeout(() => {
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        ...data,
        sentAt: new Date(),
      };
      setNotifications([newNotification, ...notifications]);
      setIsSending(false);
      reset();
      toast({
        title: 'Notification Sent!',
        description: 'Your notification has been sent to all employees.',
      });
    }, 1500);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Send a Notification</CardTitle>
          <CardDescription>
            Compose and send a push notification to all employees.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="e.g., Important Update"
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                {...register('message')}
                placeholder="Enter your notification message here."
                rows={5}
              />
              {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSending} className="w-full">
              {isSending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Send Notification
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>
            A log of previously sent notifications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Notification</TableHead>
                  <TableHead className="text-right">Sent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notif) => (
                  <TableRow key={notif.id}>
                    <TableCell>
                      <p className="font-bold">{notif.title}</p>
                      <p className="text-sm text-muted-foreground">{notif.message}</p>
                    </TableCell>
                    <TableCell className="text-right">
                        <TimeAgo date={notif.sentAt} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <Bell className="mx-auto h-12 w-12" />
              <p className="mt-4">No notifications sent yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
