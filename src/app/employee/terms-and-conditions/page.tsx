
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Trophy } from "lucide-react";

export default function TermsAndConditionsPage() {
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
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <FileText className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Terms and Conditions</CardTitle>
                            <CardDescription>Last Updated: [Date]</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Welcome to Taskbatao! These terms and conditions outline the rules and regulations for the use of Taskbatao's Website, located at taskbatao.com.</p>
                    
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Taskbatao if you do not agree to take all of the terms and conditions stated on this page.</p>

                    <h2>2. User Account</h2>
                    <p>You are responsible for safeguarding your account and for any activities or actions under your account. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</p>

                    <h2>3. Tasks and Payments</h2>
                    <p>Taskbatao provides a platform for users to complete tasks for rewards. Payments are subject to our withdrawal policies, including minimum withdrawal amounts and processing times. We reserve the right to withhold payments for any fraudulent activity or violation of our policies.</p>

                    <h2>4. Prohibited Activities</h2>
                    <p>You are expressly prohibited from all of the following:</p>
                    <ul>
                        <li>Using any automated scripts or bots to complete tasks.</li>
                        <li>Creating multiple accounts for a single user.</li>
                        <li>Submitting fraudulent or falsified proof of task completion.</li>
                        <li>Engaging in any activity that is illegal or harmful to the platform or its users.</li>
                    </ul>

                    <h2>5. Termination</h2>
                    <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>

                    <h2>6. Changes to Terms</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                    
                    <h2>7. Contact Us</h2>
                    <p>If you have any questions about these Terms, please contact us at support@taskbatao.com.</p>
                </CardContent>
            </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
    )
}
