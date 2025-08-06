
'use client';

import { BackButton } from "@/components/back-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function BuyerPrivacyPolicyPage() {
    return (
         <div className="flex min-h-screen w-full flex-col bg-muted/40">
             <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <BackButton />
                <h1 className="text-xl font-semibold">Privacy Policy</h1>
             </header>
            <main className="p-4 sm:p-6 lg:p-8">
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
                            <li>Company Name and contact information, including email address.</li>
                            <li>Campaign details, including target URLs.</li>
                            <li>Financial information for payment processing, which is handled by our secure payment gateway partners.</li>
                        </ul>

                        <h2>2. How We Use Your Information</h2>
                        <p>We use the information we collect in various ways, including to:</p>
                        <ul>
                            <li>Provide, operate, and maintain our services.</li>
                            <li>Process your transactions and create your campaigns.</li>
                            <li>Prevent fraud and ensure the security of our platform.</li>
                            <li>Communicate with you for customer service and support.</li>
                        </ul>

                        <h2>3. Security of Your Information</h2>
                        <p>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.</p>

                        <h2>4. Third-Party Privacy Policies</h2>
                        <p>Taskbatao's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers or payment gateways for more detailed information.</p>
                        
                        <h2>5. Your Rights</h2>
                        <p>You have the right to access or correct your personal information. To exercise these rights, please contact us.</p>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
