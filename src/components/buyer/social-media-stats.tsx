
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Youtube, Facebook, Instagram, Users, Clock, ThumbsUp, Search, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';

const stats = {
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

export function SocialMediaStats() {
    const [showStats, setShowStats] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState('');

    const handleFetchStats = () => {
        if (!url) return;
        setIsLoading(true);
        setTimeout(() => {
            setShowStats(true);
            setIsLoading(false);
        }, 1500);
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle>Your Social Media Snapshot</CardTitle>
            <CardDescription>Enter a link to your social media page/channel to see its current stats.</CardDescription>
            <div className="flex w-full max-w-sm items-center space-x-2 pt-2">
                <Input type="url" placeholder="e.g., https://youtube.com/your-channel" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Button onClick={handleFetchStats} disabled={isLoading || !url}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    <span className="ml-2 hidden sm:inline">Fetch Stats</span>
                </Button>
            </div>
        </CardHeader>
        {showStats && (
            <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-red-600">
                                <Youtube />
                                <span>YouTube</span>
                            </CardTitle>
                            <CardDescription>Current channel statistics</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                                <Users className="h-6 w-6 mb-2 text-muted-foreground" />
                                <p className="text-2xl font-bold">{stats.youtube.subscribers}</p>
                                <p className="text-xs text-muted-foreground">Subscribers</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                                <Clock className="h-6 w-6 mb-2 text-muted-foreground" />
                                <p className="text-2xl font-bold">{stats.youtube.watchTime}</p>
                                <p className="text-xs text-muted-foreground">Watch Time</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-600">
                                <Facebook />
                                <span>Facebook</span>
                            </CardTitle>
                            <CardDescription>Current page statistics</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                                <Users className="h-6 w-6 mb-2 text-muted-foreground" />
                                <p className="text-2xl font-bold">{stats.facebook.followers}</p>
                                <p className="text-xs text-muted-foreground">Followers</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                                <ThumbsUp className="h-6 w-6 mb-2 text-muted-foreground" />
                                <p className="text-2xl font-bold">{stats.facebook.likes}</p>
                                <p className="text-xs text-muted-foreground">Page Likes</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-pink-600">
                                <Instagram />
                                <span>Instagram</span>
                            </CardTitle>
                            <CardDescription>Current profile statistics</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                                <Users className="h-6 w-6 mb-2 text-muted-foreground" />
                                <p className="text-2xl font-bold">{stats.instagram.followers}</p>
                                <p className="text-xs text-muted-foreground">Followers</p>
                            </div>
                            <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted">
                                <ThumbsUp className="h-6 w-6 mb-2 text-muted-foreground" />
                                <p className="text-2xl font-bold">{stats.instagram.likes}</p>
                                <p className="text-xs text-muted-foreground">Avg. Likes</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        )}
    </Card>
  );
}
