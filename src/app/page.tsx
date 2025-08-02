import { Header } from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";
import { ClickAndEarn } from "@/components/tasks/click-and-earn";
import { LinkShortener } from "@/components/tasks/link-shortener";
import { QuizSection } from "@/components/tasks/quiz-section";
import { WatchAndEarn } from "@/components/tasks/watch-and-earn";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Trophy } from "lucide-react";


export default function Home() {
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
        <main className="p-4 sm:p-6 lg:p-8 space-y-12">
          <ClickAndEarn />
          <Separator />
          <WatchAndEarn />
          <Separator />
          <LinkShortener />
          <Separator />
          <QuizSection />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
