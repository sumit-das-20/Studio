
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
import { Trophy, UserPlus } from "lucide-react";
import { SocialTaskCard } from "@/components/tasks/social-task-card";
import { useMockData } from "@/hooks/use-mock-data";


export default function YoutubeSubscribePage() {
    const { socialTasks } = useMockData();
    const youtubeTasks = socialTasks.filter(task => task.platform === 'YouTube' && task.type === 'Subscribe');

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
                <UserPlus className="h-8 w-8 text-red-600" />
                <div>
                <h2 className="text-2xl font-bold font-headline">YouTube - Subscribe & Earn</h2>
                <p className="text-muted-foreground">
                    Subscribe to the channel, upload a screenshot as proof, and get paid upon verification.
                </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {youtubeTasks.map(task => (
                    <SocialTaskCard key={task.id} task={task} />
                ))}
            </div>
             {youtubeTasks.length === 0 && (
                <div className="text-center text-muted-foreground py-12">
                    <p>No subscribe tasks available for YouTube at the moment.</p>
                </div>
            )}
        </main>
      </SidebarInset>
    </SidebarProvider>
    )
}
