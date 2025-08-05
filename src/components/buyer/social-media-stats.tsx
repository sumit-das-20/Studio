
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Youtube, Facebook, Instagram, Users, Clock, ThumbsUp, Search, Loader2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

const mockStats = {
    youtube: {
        subscribers: '1.2M',
        watchTime: '4,000 hrs',
    },
    facebook: {
        followers: '50.1K',
        likes: '48.9K',
    },
    instagram: {
        followers: '120.4K',
        likes: '1.5K avg',
    }
};

type SocialPlatform = 'youtube' | 'facebook' | 'instagram';

type Analysis = {
    id: number;
    platform: SocialPlatform;
    url: string;
    stats: typeof mockStats[SocialPlatform];
}

const getPlatformFromUrl = (url: string): SocialPlatform | null => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('facebook.com')) return 'facebook';
    if (url.includes('instagram.com')) return 'instagram';
    return null;
}

const PlatformCard = ({ platform, stats, onRemove }: { platform: SocialPlatform, stats: Analysis['stats'], onRemove: () => void }) => {
    const platformDetails = {
        youtube: { icon: Youtube, name: 'YouTube', color: 'text-red-600', metrics: [{ icon: Users, value: stats.subscribers, label: 'Subscribers' }, { icon: Clock, value: (stats as any).watchTime, label: 'Watch Time' }] },
        facebook: { icon: Facebook, name: 'Facebook', color: 'text-blue-600', metrics: [{ icon: Users, value: stats.followers, label: 'Followers' }, { icon: ThumbsUp, value: (stats as any).likes, label: 'Page Likes' }] },
        instagram: { icon: Instagram, name: 'Instagram', color: 'text-pink-600', metrics: [{ icon: Users, value: stats.followers, label: 'Followers' }, { icon: ThumbsUp, value: (stats as any).likes, label: 'Avg. Likes' }] }
    }[platform];

    return (
        <Card className="relative">
             <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={onRemove}>
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
            </Button>
            <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${platformDetails.color}`}>
                    <platformDetails.icon />
                    <span>{platformDetails.name}</span>
                </CardTitle>
                <CardDescription>Current statistics</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                {platformDetails.metrics.map(metric => (
                    <div key={metric.label} className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                        <metric.icon className="h-6 w-6 mb-2 text-muted-foreground" />
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <p className="text-xs text-muted-foreground">{metric.label}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};


export function SocialMediaStats() {
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');

    const handleFetchStats = () => {
        const platform = getPlatformFromUrl(url);
        if (!platform) {
            alert("Please enter a valid YouTube, Facebook, or Instagram URL.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            const newAnalysis: Analysis = {
                id: Date.now(),
                platform,
                url,
                stats: mockStats[platform],
            };
            setAnalyses(prev => [newAnalysis, ...prev]);
            setUrl(''); // Clear input after fetching
            setIsLoading(false);
        }, 1500);
    }

    const handleRemoveAnalysis = (id: number) => {
        setAnalyses(prev => prev.filter(analysis => analysis.id !== id));
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Your Social Media Snapshot</CardTitle>
            <CardDescription>Enter a link to your social media page/channel to see its current stats. You can add multiple.</CardDescription>
            <div className="flex w-full max-w-sm items-center space-x-2 pt-2">
                <Input type="url" placeholder="e.g., https://youtube.com/your-channel" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Button onClick={handleFetchStats} disabled={isLoading || !url}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    <span className="ml-2 hidden sm:inline">Fetch Stats</span>
                </Button>
            </div>
        </CardHeader>
        {analyses.length > 0 && (
            <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                   {analyses.map(analysis => (
                       <PlatformCard 
                            key={analysis.id}
                            platform={analysis.platform}
                            stats={analysis.stats}
                            onRemove={() => handleRemoveAnalysis(analysis.id)}
                       />
                   ))}
                </div>
            </CardContent>
        )}
    </Card>
  );
}
