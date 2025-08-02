'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function EarningsCounter() {
  const [earnings, setEarnings] = useState(0.0);
  const earningsRef = useRef(0.0);
  const animationRef = useRef<number>();

  const animateValue = useCallback((start: number, end: number, duration: number) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    const startTime = performance.now();
    const frame = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const value = start + (end - start) * progress;
      setEarnings(value);
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(frame);
      }
    };
    animationRef.current = requestAnimationFrame(frame);
  }, []);

  const handleEarn = useCallback(
    (event: CustomEvent) => {
      const amount = event.detail.amount;
      const currentEarnings = earningsRef.current;
      const newEarnings = currentEarnings + amount;
      earningsRef.current = newEarnings;
      animateValue(currentEarnings, newEarnings, 500);
    },
    [animateValue]
  );

  useEffect(() => {
    const eventListener = (e: Event) => handleEarn(e as CustomEvent);
    window.addEventListener('earn', eventListener);
    return () => {
      window.removeEventListener('earn', eventListener);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleEarn]);

  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-lg transition-transform hover:scale-105">
      <span className="text-xl font-bold">$</span>
      <span className="text-xl font-bold font-headline tabular-nums">
        {earnings.toFixed(2)}
      </span>
      <span className="text-sm font-semibold">USD</span>
    </div>
  );
}
