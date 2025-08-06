
'use client';

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
import { Trophy, MessageSquare } from "lucide-react";
import { SocialTaskCard } from '@/components/tasks/social-task-card';
import { useMockData } from "@/hooks/use-mock-data";


export default function FacebookLikePage() {
    const { socialTasks } = useMockData();
    const facebookTasks = socialTasks.filter(task => task.platform === 'Facebook' && task.type === 'Like & Comment');

    return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold font-headline text-primary-foreground bg-primary px-2 py-1 rounded-md">Taskbatao</h1>
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
                <MessageSquare className="h-8 w-8 text-blue-600" />
                <div>
                <h2 className="text-2xl font-bold font-headline">Facebook - Like, Comment & Earn</h2>
                <p className="text-muted-foreground">
                    Like the post, upload a screenshot as proof, and get paid upon verification.
                </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {facebookTasks.map(task => (
                    <SocialTaskCard key={task.id} task={task} />
                ))}
            </div>
            {facebookTasks.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                    <p>No like/comment tasks available for Facebook at the moment.</p>
                </div>
            )}
        </main>
      </SidebarInset>
    </SidebarProvider>
    )
}
