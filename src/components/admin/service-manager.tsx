
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
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Edit, Facebook, Instagram, Tags, Youtube } from 'lucide-react';
import type { SocialService } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

// --- Mock Data ---
// In a real application, this would be fetched from your database.
const initialServices: SocialService[] = [
    // YouTube
    { id: 'yt-sub', platform: 'YouTube', serviceName: 'Subscribers', unit: 'per subscriber', pricePerUnit: 0.10, status: 'Active' },
    { id: 'yt-like', platform: 'YouTube', serviceName: 'Likes', unit: 'per like', pricePerUnit: 0.02, status: 'Active' },
    { id: 'yt-comment', platform: 'YouTube', serviceName: 'Comments', unit: 'per comment', pricePerUnit: 0.05, status: 'Active' },
    { id: 'yt-watch', platform: 'YouTube', serviceName: 'Watch Time', unit: 'per hour', pricePerUnit: 0.25, status: 'Inactive' },
    // Facebook
    { id: 'fb-like', platform: 'Facebook', serviceName: 'Page Likes', unit: 'per like', pricePerUnit: 0.08, status: 'Active' },
    { id: 'fb-follow', platform: 'Facebook', serviceName: 'Followers', unit: 'per follower', pricePerUnit: 0.09, status: 'Active' },
    { id: 'fb-share', platform: 'Facebook', serviceName: 'Post Shares', unit: 'per share', pricePerUnit: 0.04, status: 'Active' },
    // Instagram
    { id: 'ig-follow', platform: 'Instagram', serviceName: 'Followers', unit: 'per follower', pricePerUnit: 0.12, status: 'Active' },
    { id: 'ig-like', platform: 'Instagram', serviceName: 'Post Likes', unit: 'per like', pricePerUnit: 0.02, status: 'Active' },
];

const platformConfig = {
    YouTube: { icon: Youtube, color: 'text-red-600' },
    Facebook: { icon: Facebook, color: 'text-blue-600' },
    Instagram: { icon: Instagram, color: 'text-pink-600' },
};


const EditServiceDialog = ({ service, onSave }: { service: SocialService; onSave: (service: SocialService) => void; }) => {
    const [price, setPrice] = useState(service.pricePerUnit);

    const handleSave = () => {
        onSave({ ...service, pricePerUnit: price });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Price for {service.serviceName}</DialogTitle>
                    <DialogDescription>
                        Update the price per unit for this service. This will affect new campaigns created by buyers.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price (INR)</Label>
                        <Input 
                            id="price" 
                            type="number" 
                            step="0.01" 
                            value={price} 
                            onChange={(e) => setPrice(Number(e.target.value))} 
                            placeholder="Enter new price"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                     <DialogClose asChild>
                        <Button onClick={handleSave}>Save Price</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export function ServiceManager() {
    const [services, setServices] = useState<SocialService[]>(initialServices);
    const { toast } = useToast();

    const handleSaveService = (updatedService: SocialService) => {
        setServices(services.map(s => s.id === updatedService.id ? updatedService : s));
        toast({
            title: `Service Updated`,
            description: `The price for ${updatedService.serviceName} has been updated.`
        });
    }

    const groupedServices = services.reduce((acc, service) => {
        (acc[service.platform] = acc[service.platform] || []).push(service);
        return acc;
    }, {} as Record<SocialService['platform'], SocialService[]>);

    return (
        <div className="space-y-6">
            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Tags className="h-6 w-6" />
                        <span>Social Media Service Management</span>
                    </CardTitle>
                    <CardDescription>
                        Manage the pricing for services offered to buyers on the platform.
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 {Object.entries(groupedServices).map(([platform, serviceList]) => {
                    const config = platformConfig[platform as keyof typeof platformConfig];
                    return (
                        <Card key={platform}>
                            <CardHeader>
                                <CardTitle className={`flex items-center gap-2 ${config.color}`}>
                                    <config.icon className="h-6 w-6" />
                                    <span>{platform} Services</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Service</TableHead>
                                            <TableHead>Price/Unit (INR)</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {serviceList.map(service => (
                                            <TableRow key={service.id}>
                                                <TableCell>
                                                    <div className="font-medium">{service.serviceName}</div>
                                                    <div className="text-xs text-muted-foreground">{service.unit}</div>
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    ₹{service.pricePerUnit.toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <EditServiceDialog service={service} onSave={handleSaveService} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    )
                 })}
            </div>
        </div>
    );
}
