
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

// This is a representation of tasks generated from a single buyer's campaign.
// In a real app, this data would be fetched from a database. The reward for each
// task is set by the buyer in the admin panel and is part of the task data itself.
const instagramTasks: SocialTask[] = [
    { id: 1, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
    { id: 2, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
    { id: 3, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
    { id: 4, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
    { id: 5, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
    { id: 6, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
    { id: 7, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
    { id: 8, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
    { id: 9, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
    { id: 10, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
    { id: 11, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
    { id: 12, type: 'Like & Comment', title: 'Like Post: "A photo of a cute puppy."', reward: 0.18, link: "https://instagram.com/p/example" },
];


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
