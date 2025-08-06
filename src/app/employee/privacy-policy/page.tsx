
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
import { Shield, Trophy } from "lucide-react";

export default function PrivacyPolicyPage() {
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
                        <Shield className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Privacy Policy</CardTitle>
                            <CardDescription>Last Updated: [Date]</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                    <p>Your privacy is important to us. It is Taskbatao's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
                    
                    <h2>1. Information We Collect</h2>
                    <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
                    <p>Information we may collect includes:</p>
                    <ul>
                        <li>Name and contact information, including email address.</li>
                        <li>Demographic information such as postcode, preferences, and interests.</li>
                        <li>Financial information for payment processing.</li>
                        <li>Other information relevant to customer surveys and/or offers.</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use the information we collect in various ways, including to:</p>
                    <ul>
                        <li>Provide, operate, and maintain our website.</li>
                        <li>Improve, personalize, and expand our website.</li>
                        <li>Understand and analyze how you use our website.</li>
                        <li>Develop new products, services, features, and functionality.</li>
                        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                        <li>Process your transactions and prevent fraud.</li>
                    </ul>

                    <h2>3. Security of Your Information</h2>
                    <p>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.</p>

                    <h2>4. Cookies</h2>
                    <p>We use cookies to help us improve our website's performance and your experience. Cookies are small files that are stored on your computer's hard drive. They help us to analyze web traffic and let us know when you visit a particular site.</p>

                    <h2>5. Third-Party Privacy Policies</h2>
                    <p>Taskbatao's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.</p>
                    
                    <h2>6. Your Rights</h2>
                    <p>You have the right to access, correct, or delete your personal information. You may also object to the processing of your personal data. To exercise these rights, please contact us.</p>
                </CardContent>
            </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
    )
}
