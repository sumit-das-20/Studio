'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, Check, ExternalLink } from 'lucide-react';
import type { LinkTask } from '@/lib/types';

const initialTasks: LinkTask[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  url: `https://short.link/example${i + 1}`,
  reward: 1,
}));

export function LinkShortener() {
  const [clickedLinks, setClickedLinks] = useState<Set<number>>(new Set());

  const handleClick = (task: LinkTask) => {
    if (clickedLinks.has(task.id)) return;

    setClickedLinks(new Set(clickedLinks).add(task.id));
    window.dispatchEvent(
      new CustomEvent('earn', { detail: { amount: task.reward } })
    );
    // In a real app, you would open the link: window.open(task.url, '_blank');
  };

  return (
    <section id="link-shortener">
       <div className="mb-4 flex items-center gap-4">
        <Link className="h-8 w-8 text-primary" />
        <div>
          <h2 className="text-2xl font-bold font-headline">Click Links & Earn</h2>
          <p className="text-muted-foreground">
            Click on each short link to earn. Links can only be clicked once.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {initialTasks.map((task) => {
          const isClicked = clickedLinks.has(task.id);
          return (
            <Button
              key={task.id}
              variant={isClicked ? 'secondary' : 'outline'}
              className="flex h-20 flex-col items-center justify-center gap-1 transition-all"
              onClick={() => handleClick(task)}
              disabled={isClicked}
            >
              {isClicked ? (
                <>
                  <Check className="h-6 w-6 text-primary" />
                  <span className="text-xs">Clicked</span>
                </>
              ) : (
                <>
                  <ExternalLink className="h-6 w-6" />
                  <span className="text-xs">+₹{task.reward.toFixed(2)}</span>
                </>
              )}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
