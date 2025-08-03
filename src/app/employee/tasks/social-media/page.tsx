
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
import { Trophy, Share2, Youtube, Facebook, Instagram, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BackButton } from "@/components/back-button";

const socialPlatforms = [
  { name: "YouTube", icon: Youtube, href: "/employee/tasks/social-media/youtube", description: "Subscribe to channels, like videos, and more." },
  { name: "Facebook", icon: Facebook, href: "/employee/tasks/social-media/facebook", description: "Like pages, join groups, and engage with posts." },
  { name: "Instagram", icon: Instagram, href: "/employee/tasks/social-media/instagram", description: "Follow accounts, like photos, and watch stories." },
];

export default function SocialMediaPage() {
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
                <Share2 className="h-8 w-8 text-primary" />
                <div>
                <h2 className="text-2xl font-bold font-headline">Social Media Tasks</h2>
                <p className="text-muted-foreground">
                    Choose a platform to find available tasks and start earning.
                </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialPlatforms.map((platform) => (
                    <Card key={platform.name} className="hover:shadow-lg transition-shadow flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <platform.icon className="h-8 w-8 text-primary" />
                                <CardTitle className="text-xl">{platform.name} Tasks</CardTitle>
                            </div>
                            <CardDescription>{platform.description}</CardDescription>
                        </CardHeader>
                         <CardContent className="flex-grow flex items-end">
                            <Button asChild className="w-full mt-auto">
                                <Link href={platform.href}>
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
