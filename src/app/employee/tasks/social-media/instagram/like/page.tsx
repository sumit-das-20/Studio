
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
import { Trophy, Heart } from "lucide-react";
import { SocialTaskCard } from '@/components/tasks/social-task-card';
import { SocialTask } from "@/lib/types";

// The rewardPerTask would be set by the admin in the campaign settings.
const singleCampaign = {
    id: 1,
    postDescription: "A photo of a cute puppy.",
    taskType: "Like & Comment",
    rewardPerTask: 0.18, // This value would be fetched from the backend.
    link: "https://instagram.com/p/example",
};

// Generate a list of tasks based on the campaign.
const instagramTasks: SocialTask[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    type: singleCampaign.taskType,
    title: `Like Post: "${singleCampaign.postDescription}"`,
    reward: singleCampaign.rewardPerTask,
    link: singleCampaign.link,
}));


export default function InstagramLikePage() {

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
                <Heart className="h-8 w-8 text-pink-600" />
                <div>
                <h2 className="text-2xl font-bold font-headline">Instagram - Like, Comment & Earn</h2>
                <p className="text-muted-foreground">
                    Like the post, upload a screenshot as proof, and get paid upon verification.
                </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {instagramTasks.map(task => (
                    <SocialTaskCard key={task.id} task={task} />
                ))}
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
    )
}
