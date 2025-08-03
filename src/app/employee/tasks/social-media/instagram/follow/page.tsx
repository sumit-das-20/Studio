
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

export default function InstagramFollowPage() {
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
                <UserPlus className="h-8 w-8 text-pink-600" />
                <div>
                <h2 className="text-2xl font-bold font-headline">Instagram - Follow Accounts</h2>
                <p className="text-muted-foreground">
                    Tasks for following accounts are coming soon.
                </p>
                </div>
            </div>
             <div className="flex items-center justify-center h-48 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">No tasks available yet.</p>
            </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
    )
}
