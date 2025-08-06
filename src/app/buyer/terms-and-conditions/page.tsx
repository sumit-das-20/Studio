
'use client';

import { BackButton } from "@/components/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShoppingBag } from "lucide-react";

export default function BuyerTermsAndConditionsPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
             <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <BackButton />
                <h1 className="text-xl font-semibold">Buyer Terms</h1>
             </header>
            <main className="p-4 sm:p-6 lg:p-8">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                                <CardTitle>Buyer Terms and Conditions</CardTitle>
                                <CardDescription>Last Updated: [Date]</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="prose dark:prose-invert max-w-none">
                        <p>Welcome to Taskbatao! These terms and conditions outline the rules and regulations for buyers using Taskbatao's services.</p>
                        
                        <h2>1. Campaign Creation</h2>
                        <p>As a buyer, you can create campaigns to purchase social media engagement. You are responsible for providing accurate information, including the target URL and service type. All campaigns are subject to review by our admin team before activation.</p>

                        <h2>2. Payments</h2>
                        <p>All payments for campaigns must be made in advance. We use secure third-party payment gateways to process transactions. Once a payment is made, it is non-refundable unless a campaign is rejected by our admin team.</p>

                        <h2>3. Service Delivery</h2>
                        <p>Campaigns typically start within 4-6 hours after successful payment and admin approval. We strive to complete campaigns in a timely manner, but delivery times may vary based on platform demand and task availability. You can monitor progress on your dashboard.</p>

                        <h2>4. Prohibited Content</h2>
                        <p>You may not create campaigns for content that is illegal, defamatory, hateful, or violates any social media platform's terms of service. We reserve the right to reject any campaign at our discretion.</p>

                        <h2>5. Liability</h2>
                        <p>Taskbatao is not responsible for any direct or indirect damages resulting from the use of our services, including any changes to your social media account's standing. We provide engagement as requested, but we do not guarantee any specific outcomes like sales or conversions.</p>
                        
                        <h2>6. Contact Us</h2>
                        <p>If you have any questions about these Buyer Terms, please contact us at buyersupport@taskbatao.com.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
