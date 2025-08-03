
'use client';

import { Header } from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Trophy, Youtube, ThumbsUp, Video, UserPlus, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BackButton } from "@/components/back-button";

const youtubeTaskTypes = [
  { 
    name: "Subscribe Tasks", 
    icon: UserPlus, 
    href: "/employee/tasks/social-media/youtube/subscribe", 
    description: "Subscribe to channels to earn rewards." 
  },
  { 
    name: "Watch Videos", 
    icon: Video, 
    href: "/employee/tasks/social-media/youtube/watch", 
    description: "Watch videos for a set duration to earn." 
  },
  { 
    name: "Like & Comment", 
    icon: ThumbsUp, 
    href: "/employee/tasks/social-media/youtube/like", 
    description: "Like and comment on videos for rewards." 
  },
];

export default function YoutubeTasksPage() {
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
                    Choose a task type to start earning.
                </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {youtubeTaskTypes.map(task => (
                    <Card key={task.name} className="hover:shadow-lg transition-shadow flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <task.icon className="h-8 w-8 text-primary" />
                                <CardTitle className="text-xl">{task.name}</CardTitle>
                            </div>
                            <CardDescription>{task.description}</CardDescription>
                        </CardHeader>
                         <CardContent className="flex-grow flex items-end">
                            <Button asChild className="w-full mt-auto">
                                <Link href={task.href}>
                                    View Tasks <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
    )
}
