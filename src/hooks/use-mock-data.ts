
'use client';

import { useState, useCallback } from 'react';
import { initialSocialTasks, addSocialTasks as apiAddSocialTasks, completeSocialTask as apiCompleteSocialTask } from '@/lib/mock-data';
import type { SocialTask } from '@/lib/types';

// In a real-world application, this would use React Context or a state management library
// like Zustand or Redux to provide data across the component tree.
// For this simulation, we use a simple custom hook that manages its own state.

export const useMockData = () => {
    const [socialTasks, setSocialTasks] = useState<SocialTask[]>(initialSocialTasks);

    const addSocialTasks = useCallback((newTasks: SocialTask[]) => {
        // This function simulates adding tasks and then updating the local state.
        // In a real app, this would be an API call to a backend.
        apiAddSocialTasks(newTasks);
        // We create a new array from the updated global mock data source
        // to ensure React detects a state change and re-renders components.
        setSocialTasks([...initialSocialTasks]); 
    }, []);

    const completeSocialTask = useCallback((taskId: number, campaignId: string) => {
        apiCompleteSocialTask(taskId, campaignId);
        // Update the local state to reflect the removal of tasks from completed campaigns
        setSocialTasks([...initialSocialTasks]);
    }, []);

    return { socialTasks, addSocialTasks, completeSocialTask };
};
