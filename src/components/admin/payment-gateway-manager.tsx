
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { LandPlot, CheckCircle, Settings, XCircle } from 'lucide-react';
import type { PaymentGateway } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '../ui/dialog';
import Image from 'next/image';

const initialGateways: PaymentGateway[] = [
    {
        name: "Stripe",
        icon: () => <Image src="https://stripe.com/favicon.ico" alt="Stripe" width={24} height={24} />,
        isEnabled: false,
        apiKey: '',
        apiSecret: ''
    },
    {
        name: "Razorpay",
        icon: () => <Image src="https://razorpay.com/favicon.ico" alt="Razorpay" width={24} height={24} />,
        isEnabled: true,
        apiKey: 'rzp_test_1234567890ABCD',
        apiSecret: '********************'
    },
    {
        name: "PayPal",
        icon: () => <Image src="https://www.paypalobjects.com/webstatic/icon/favicon.ico" alt="PayPal" width={24} height={24} />,
        isEnabled: false,
        apiKey: '',
        apiSecret: ''
    },
];

const GatewaySettingsDialog = ({ gateway, onSave }: { gateway: PaymentGateway; onSave: (gateway: PaymentGateway) => void; }) => {
    const [apiKey, setApiKey] = useState(gateway.apiKey || '');
    const [apiSecret, setApiSecret] = useState(gateway.apiSecret || '');

    const handleSave = () => {
        onSave({ ...gateway, apiKey, apiSecret });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Configure {gateway.name}</DialogTitle>
                    <DialogDescription>
                        Enter the API credentials for your {gateway.name} account.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key / Client ID</Label>
                        <Input id="apiKey" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder={`Enter ${gateway.name} API Key`} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="apiSecret">API Secret</Label>
                        <Input id="apiSecret" type="password" value={apiSecret} onChange={(e) => setApiSecret(e.target.value)} placeholder={`Enter ${gateway.name} API Secret`} />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                     <DialogClose asChild>
                        <Button onClick={handleSave}>Save Configuration</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export function PaymentGatewayManager() {
    const [gateways, setGateways] = useState<PaymentGateway[]>(initialGateways);
    const { toast } = useToast();

    const handleToggle = (gatewayName: string, isEnabled: boolean) => {
        setGateways(gateways.map(g => g.name === gatewayName ? { ...g, isEnabled } : g));
        toast({
            title: `${gatewayName} has been ${isEnabled ? 'enabled' : 'disabled'}.`,
        });
    };

    const handleSaveSettings = (updatedGateway: PaymentGateway) => {
        setGateways(gateways.map(g => g.name === updatedGateway.name ? updatedGateway : g));
        toast({
            title: `Configuration Saved`,
            description: `${updatedGateway.name} settings have been updated.`
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <LandPlot className="h-6 w-6" />
                    <span>Payment Gateway Management</span>
                </CardTitle>
                <CardDescription>
                    Enable, disable, and configure the payment gateways for your platform.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gateways.map((gateway) => (
                    <Card key={gateway.name} className="flex flex-col">
                        <CardHeader className="flex-row items-center justify-between">
                             <div className="flex items-center gap-3">
                                <gateway.icon />
                                <CardTitle className="text-xl">{gateway.name}</CardTitle>
                            </div>
                             <Switch
                                checked={gateway.isEnabled}
                                onCheckedChange={(checked) => handleToggle(gateway.name, checked)}
                            />
                        </CardHeader>
                        <CardContent className="flex-grow">
                           <div className="flex items-center gap-2 text-sm">
                                {gateway.isEnabled ? (
                                    <>
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span className="text-green-600 font-medium">Enabled</span>
                                    </>
                                ) : (
                                     <>
                                        <XCircle className="h-5 w-5 text-muted-foreground" />
                                        <span className="text-muted-foreground">Disabled</span>
                                    </>
                                )}
                           </div>
                           <div className="mt-4 text-xs text-muted-foreground space-y-1">
                                <p><strong>API Key:</strong> {gateway.isEnabled && gateway.apiKey ? `${gateway.apiKey.substring(0,12)}...` : 'Not set'}</p>
                                <p><strong>API Secret:</strong> {gateway.isEnabled && gateway.apiSecret ? '••••••••••••' : 'Not set'}</p>
                           </div>
                        </CardContent>
                        <CardFooter>
                            <GatewaySettingsDialog gateway={gateway} onSave={handleSaveSettings} />
                        </CardFooter>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
}
