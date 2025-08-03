
'use client';

import { useState } from 'react';
import { Header } from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";
import { BackButton } from "@/components/back-button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Trophy, Youtube, CheckCircle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const youtubeTasks = [
    { id: 1, type: "Subscribe", channel: "Awesome Vlogger" },
    { id: 2, type: "Like Video", channel: "Gamerz Unite" },
    { id: 3, type: "Subscribe", channel: "Tech Explained" },
]

export default function YoutubeTasksPage() {
    const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

    const handleCompleteTask = (taskId: number) => {
        if (completedTasks.has(taskId)) return;

        setCompletedTasks(prev => new Set(prev).add(taskId));
         window.dispatchEvent(
          new CustomEvent('earn', { detail: { amount: 1.0 } }) // Placeholder amount
        );
         // In a real app, you would open the link:
         // window.open('https://youtube.com', '_blank');
    }

    return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-primary-foreground bg-primary px-2 py-1 rounded-md">TaskRabbit</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="p-4 sm:p-6 lg:p-8">
            <div className="mb-4">
                <BackButton />
            </div>
            <div className="mb-8 flex items-center gap-4">
                <Youtube className="h-8 w-8 text-red-600" />
                <div>
                <h2 className="text-2xl font-bold font-headline">YouTube Tasks</h2>
                <p className="text-muted-foreground">
                    Complete tasks to earn rewards.
                </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {youtubeTasks.map(task => {
                    const isCompleted = completedTasks.has(task.id);
                    return (
                        <Card key={task.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>{task.type}</span>
                                    <Badge variant="outline" className="bg-primary/10 text-primary">+ Reward</Badge>
                                </CardTitle>
                                <CardDescription>Channel: {task.channel}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button className="w-full" onClick={() => handleCompleteTask(task.id)} disabled={isCompleted}>
                                    {isCompleted ? <CheckCircle className="mr-2 h-4 w-4" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                                    {isCompleted ? 'Completed' : 'Start Task'}
                                </Button>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
    )
}
