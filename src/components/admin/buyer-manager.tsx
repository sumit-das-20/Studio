

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
import type { AdminBuyer, AdminCampaign, SocialTask } from '@/lib/types';
import { CheckCircle, ExternalLink, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useMockData } from '@/hooks/use-mock-data';
import { Gauge } from '../ui/gauge';
import { Skeleton } from '../ui/skeleton';

export function BuyerManager() {
  const { toast } = useToast();
  const [creatingTasks, setCreatingTasks] = useState<Set<string>>(new Set());
  const { buyers, addSocialTasks, updateCampaign, isLoading } = useMockData();


  const handleCreateTasks = (campaign: AdminCampaign, buyer: AdminBuyer) => {
    setCreatingTasks(prev => new Set(prev).add(campaign.id));

    // Simulate API call to backend to generate tasks
    setTimeout(() => {
        // Generate new tasks based on campaign
        const newTasks: SocialTask[] = Array.from({ length: campaign.totalTasks }, (_, i) => {
            const platformMap: Record<string, 'YouTube' | 'Facebook' | 'Instagram'> = {
                'YouTube Subscribers': 'YouTube',
                'Instagram Followers': 'Instagram',
                'Facebook Page Likes': 'Facebook',
            };
            const platform = platformMap[campaign.serviceType] || 'YouTube';
            const typeMap: Record<string, string> = {
                'YouTube Subscribers': 'Subscribe',
                'Instagram Followers': 'Follow Account',
                'Facebook Page Likes': 'Follow Page',
            }
            const type = typeMap[campaign.serviceType] || 'Like & Comment';

            return {
                id: Date.now() + i, // More unique ID
                type: type,
                title: `From campaign: ${campaign.serviceType} for ${buyer.companyName}`,
                link: campaign.targetLink,
                reward: 2.00, // This could be calculated based on buyer spend
                platform: platform,
                campaignId: campaign.id,
            }
        });

        addSocialTasks(newTasks);
        updateCampaign(buyer.id, campaign.id, { tasksCreated: true });


        setCreatingTasks(prev => {
            const newSet = new Set(prev);
            newSet.delete(campaign.id);
            return newSet;
        });
        
        toast({
            title: "Tasks Created!",
            description: `${campaign.totalTasks} tasks for campaign "${campaign.serviceType}" have been created and are now available to employees.`
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
        {isLoading ? (
            <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
        ) : (
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
                                    const isCreated = campaign.tasksCreated;
                                    const progress = campaign.totalTasks > 0 ? (campaign.tasksCompleted / campaign.totalTasks) * 100 : 0;
                                    
                                    return (
                                    <TableRow key={campaign.id}>
                                        <TableCell><Badge>{campaign.serviceType}</Badge></TableCell>
                                        <TableCell>
                                            <Link href={campaign.targetLink} target="_blank" className='flex items-center gap-2 text-blue-500 hover:underline'>
                                                {campaign.targetLink.length > 40 ? `${campaign.targetLink.substring(0, 40)}...` : campaign.targetLink}
                                                <ExternalLink className='h-4 w-4' />
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex items-center gap-2'>
                                                <Gauge value={progress} size="small" showValue={false} />
                                                <span className='font-mono text-sm'>
                                                    {campaign.tasksCompleted} / {campaign.totalTasks}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button size="sm" onClick={() => handleCreateTasks(campaign, buyer)} disabled={isCreating || isCreated}>
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
        )}
      </CardContent>
    </Card>
  );
}
