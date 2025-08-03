
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { useToast } from '@/hooks/use-toast';
import type { AdminBuyer, AdminCampaign } from '@/lib/types';
import { CheckCircle, ClipboardList, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// This is a representation of buyer data fetched from the database.
const buyers: AdminBuyer[] = [
  {
    id: 'BUYER-001',
    companyName: 'Tech Gadgets Inc.',
    email: 'contact@techgadgets.com',
    createdAt: '2024-07-28',
    campaigns: [
      {
        id: 'CAMP-001',
        serviceType: 'YouTube Subscribers',
        targetLink: 'https://youtube.com/channel/example1',
        tasksCreated: 500,
        totalTasks: 1000,
        createdAt: '2024-07-29',
      },
       {
        id: 'CAMP-002',
        serviceType: 'Instagram Followers',
        targetLink: 'https://instagram.com/techgadgets',
        tasksCreated: 100,
        totalTasks: 200,
        createdAt: '2024-07-30',
      },
    ],
  },
  {
    id: 'BUYER-002',
    companyName: 'Fashion Forward',
    email: 'style@fashionforward.co',
    createdAt: '2024-07-25',
    campaigns: [
      {
        id: 'CAMP-003',
        serviceType: 'Facebook Page Likes',
        targetLink: 'https://facebook.com/fashionforward',
        tasksCreated: 250,
        totalTasks: 500,
        createdAt: '2024-07-26',
      },
    ],
  },
];


export function BuyerManager() {
  const { toast } = useToast();
  const [creatingTasks, setCreatingTasks] = useState<Set<string>>(new Set());
  const [createdTasks, setCreatedTasks] = useState<Set<string>>(new Set());

  const handleCreateTasks = (campaign: AdminCampaign) => {
    setCreatingTasks(prev => new Set(prev).add(campaign.id));

    // Simulate API call to backend to generate tasks
    setTimeout(() => {
        setCreatingTasks(prev => {
            const newSet = new Set(prev);
            newSet.delete(campaign.id);
            return newSet;
        });
        setCreatedTasks(prev => new Set(prev).add(campaign.id));
        toast({
            title: "Tasks Created!",
            description: `Tasks for campaign "${campaign.serviceType}" have been created and are now available to employees.`
        })
    }, 2000);
  }


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Buyer Management</CardTitle>
          <CardDescription>
            View all registered buyers and their active campaigns.
          </CardDescription>
        </div>
        <Button variant="outline">View All Buyers</Button>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {buyers.map((buyer) => (
            <AccordionItem value={buyer.id} key={buyer.id}>
              <AccordionTrigger>
                <div className="flex w-full items-center justify-between pr-4">
                    <div className='text-left'>
                        <p className="font-bold">{buyer.companyName}</p>
                        <p className="text-sm text-muted-foreground">{buyer.email}</p>
                    </div>
                    <Badge variant="outline">
                        {buyer.campaigns.length} Active Campaign(s)
                    </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="p-2 bg-muted/50 rounded-md">
                    <h4 className='font-semibold mb-2'>Campaigns for {buyer.companyName}:</h4>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service Type</TableHead>
                                <TableHead>Target Link</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {buyer.campaigns.map(campaign => {
                                const isCreating = creatingTasks.has(campaign.id);
                                const isCreated = createdTasks.has(campaign.id);
                                return (
                                <TableRow key={campaign.id}>
                                    <TableCell><Badge>{campaign.serviceType}</Badge></TableCell>
                                    <TableCell>
                                        <Link href={campaign.targetLink} target="_blank" className='flex items-center gap-2 text-blue-500 hover:underline'>
                                            {campaign.targetLink.length > 40 ? `${campaign.targetLink.substring(0, 40)}...` : campaign.targetLink}
                                            <ExternalLink className='h-4 w-4' />
                                        </Link>
                                    </TableCell>
                                    <TableCell>{campaign.tasksCreated} / {campaign.totalTasks}</TableCell>
                                    <TableCell>
                                        <Button size="sm" onClick={() => handleCreateTasks(campaign)} disabled={isCreating || isCreated}>
                                            {isCreating && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
                                            {isCreated && <CheckCircle className='mr-2 h-4 w-4' />}
                                            {isCreated ? 'Tasks Created' : 'Create Tasks'}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
