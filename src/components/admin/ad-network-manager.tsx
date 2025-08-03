
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Edit, RadioTower, Trash, Copy } from 'lucide-react';
import type { AdNetwork, AdUnit } from '@/lib/types';
import { AdUnitDialog } from './ad-unit-dialog';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

// --- Mock Data ---
// In a real application, this would be fetched from your database.
const initialAdNetworks: AdNetwork[] = [
    {
        name: "AdMob",
        icon: () => <Image src="https://www.gstatic.com/images/branding/product/2x/admob_32dp.png" alt="AdMob" width={24} height={24} />,
        adUnits: [
            { id: 'admob-b1', name: 'Global Banner', unitId: 'ca-app-pub-3940256099942544/6300978111', type: 'Banner', network: 'AdMob' },
            { id: 'admob-r1', name: 'Global Rewarded', unitId: 'ca-app-pub-3940256099942544/5224354917', type: 'Rewarded Video', network: 'AdMob' },
        ],
    },
    { name: "AppLovin", adUnits: [] },
    { name: "Unity Ads", adUnits: [] },
    { name: "StartApp", adUnits: [] },
    { name: "IronSource", adUnits: [] },
    { name: "Facebook", adUnits: [] },
    { name: "InMobi", adUnits: [] },
    { name: "Chartboost", adUnits: [] },
];

export function AdNetworkManager() {
    const [adNetworks, setAdNetworks] = useState<AdNetwork[]>(initialAdNetworks);
    const { toast } = useToast();

    const handleCopy = (unitId: string) => {
        navigator.clipboard.writeText(unitId);
        toast({ title: 'Copied!', description: 'Ad unit ID copied to clipboard.' });
    };

    const handleSaveAdUnit = (adUnit: AdUnit, isEditing: boolean) => {
        setAdNetworks(prevNetworks =>
            prevNetworks.map(network => {
                if (network.name === adUnit.network) {
                    const newAdUnits = isEditing
                        ? network.adUnits.map(unit => (unit.id === adUnit.id ? adUnit : unit))
                        : [...network.adUnits, { ...adUnit, id: `${network.name}-${Math.random()}` }];
                    return { ...network, adUnits: newAdUnits };
                }
                return network;
            })
        );
        toast({
            title: `Ad Unit ${isEditing ? 'Updated' : 'Created'}`,
            description: `The ad unit "${adUnit.name}" has been saved successfully.`
        });
    };

    const handleDeleteAdUnit = (adUnitToDelete: AdUnit) => {
        setAdNetworks(prevNetworks =>
            prevNetworks.map(network => {
                if (network.name === adUnitToDelete.network) {
                    return { ...network, adUnits: network.adUnits.filter(unit => unit.id !== adUnitToDelete.id) };
                }
                return network;
            })
        );
        toast({
            title: 'Ad Unit Deleted',
            description: `The ad unit "${adUnitToDelete.name}" has been deleted.`,
            variant: 'destructive'
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <RadioTower className="h-6 w-6" />
                    <span>Ad Network Management</span>
                </CardTitle>
                <CardDescription>
                    Add, edit, and manage ad units from all your monetization platforms.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue={adNetworks[0].name}>
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                        {adNetworks.map((network) => (
                            <TabsTrigger key={network.name} value={network.name}>
                                {network.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {adNetworks.map((network) => (
                        <TabsContent key={network.name} value={network.name}>
                            <Card>
                                <CardHeader className="flex-row items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {network.icon && <network.icon />}
                                        <CardTitle>{network.name} Ad Units</CardTitle>
                                    </div>
                                    <AdUnitDialog networkName={network.name} onSave={handleSaveAdUnit} />
                                </CardHeader>
                                <CardContent>
                                    {network.adUnits.length > 0 ? (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Name</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Ad Unit ID</TableHead>
                                                    <TableHead className="text-center">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {network.adUnits.map((unit) => (
                                                    <TableRow key={unit.id}>
                                                        <TableCell className="font-medium">{unit.name}</TableCell>
                                                        <TableCell><Badge variant="secondary">{unit.type}</Badge></TableCell>
                                                        <TableCell>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-mono text-xs">{unit.unitId}</span>
                                                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(unit.unitId)}>
                                                                    <Copy className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <AdUnitDialog networkName={network.name} adUnit={unit} onSave={handleSaveAdUnit} />
                                                                <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDeleteAdUnit(unit)}>
                                                                    <Trash className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    ) : (
                                        <div className="py-12 text-center text-muted-foreground">
                                            <p>No ad units configured for {network.name}.</p>
                                            <AdUnitDialog networkName={network.name} onSave={handleSaveAdUnit} isFirstUnit={true} />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
}
