
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { PlusCircle, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { AdUnit } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const adUnitSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  unitId: z.string().min(5, "Ad Unit ID seems too short."),
  type: z.enum(['Banner', 'Rewarded Video', 'Interstitial', 'Other']),
});

type AdUnitFormValues = z.infer<typeof adUnitSchema>;

type AdUnitDialogProps = {
    networkName: AdUnit['network'];
    adUnit?: AdUnit;
    onSave: (data: AdUnit, isEditing: boolean) => void;
    isFirstUnit?: boolean;
};

export function AdUnitDialog({ networkName, adUnit, onSave, isFirstUnit = false }: AdUnitDialogProps) {
    const [open, setOpen] = useState(false);
    const isEditing = !!adUnit;

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<AdUnitFormValues>({
        resolver: zodResolver(adUnitSchema),
        defaultValues: {
            name: '',
            unitId: '',
            type: 'Banner',
        }
    });

    useEffect(() => {
        if (adUnit) {
            reset({
                name: adUnit.name,
                unitId: adUnit.unitId,
                type: adUnit.type,
            });
        } else {
            reset({
                name: '',
                unitId: '',
                type: 'Banner',
            });
        }
    }, [adUnit, open, reset]);


    const processSubmit = (data: AdUnitFormValues) => {
        const adUnitData: AdUnit = {
            id: adUnit?.id || '', // ID is handled by the parent
            network: networkName,
            ...data
        };
        onSave(adUnitData, isEditing);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {isEditing ? (
                     <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit Ad Unit</span>
                    </Button>
                ) : isFirstUnit ? (
                    <Button variant="link" className="mt-2">Add the first ad unit</Button>
                ) : (
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Ad Unit
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit' : 'Create'} Ad Unit for {networkName}</DialogTitle>
                    <DialogDescription>
                        Fill in the details for your ad unit. This ID will be used in tasks.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(processSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Ad Unit Name</Label>
                        <Input id="name" {...register('name')} placeholder="e.g., Android Rewarded Video" />
                        {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="unitId">Ad Unit ID</Label>
                        <Input id="unitId" {...register('unitId')} placeholder="ca-app-pub-..." />
                        {errors.unitId && <p className="text-sm text-destructive">{errors.unitId.message}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="type">Ad Unit Type</Label>
                        <Controller
                            name="type"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="type">
                                        <SelectValue placeholder="Select a type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Banner">Banner</SelectItem>
                                        <SelectItem value="Rewarded Video">Rewarded Video</SelectItem>
                                        <SelectItem value="Interstitial">Interstitial</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                         {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">{isEditing ? 'Save Changes' : 'Create Ad Unit'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
