
import { Header } from "@/components/header";
import { SidebarNav } from "@/components/sidebar-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clapperboard, DollarSign, HelpCircle, Link as LinkIcon, MousePointerClick, Trophy, Wallet } from "lucide-react";
import Link from "next/link";


const stats = [
    { title: "Today's Earnings", value: "₹150.00", icon: DollarSign },
    { title: "This Month's Earnings", value: "₹2,450.00", icon: DollarSign },
    { title: "Total Earnings", value: "₹12,800.00", icon: Trophy },
    { title: "Total Withdrawal", value: "₹8,200.00", icon: Wallet },
]

const tasks = [
    { href: "/employee/tasks/click-and-earn", title: "Click & Earn", icon: MousePointerClick, description: "Complete simple tasks to earn rewards." },
    { href: "/employee/tasks/watch-and-earn", title: "Watch & Earn", icon: Clapperboard, description: "Watch video ads and earn." },
    { href: "/employee/tasks/link-shortener", title: "Click Links & Earn", icon: LinkIcon, description: "Click on short links to get paid." },
    { href: "/employee/tasks/quiz", title: "Quiz Time", icon: HelpCircle, description: "Answer quizzes to win rewards." },
]

export default function DashboardPage() {
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
            {/* Stats Section */}
            <section>
                 <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.title}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Tasks Section */}
            <section>
                <div className="mb-4">
                    <h2 className="text-2xl font-bold font-headline">Available Tasks</h2>
                    <p className="text-muted-foreground">Click on a task type to start earning.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tasks.map((task) => (
                        <Card key={task.href} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="flex flex-row items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-md">
                                    <task.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{task.title}</CardTitle>
                                    <p className="text-sm text-muted-foreground">{task.description}</p>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Button asChild className="w-full">
                                    <Link href={task.href}>
                                        Start Task <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
