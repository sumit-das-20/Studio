
'use client';

import { useState, useCallback } from 'react';
import { socialTasks as initialSocialTasks, addSocialTasks as apiAddSocialTasks, completeSocialTask as apiCompleteSocialTask, allTasks as initialAllTasks, addAdminTask as apiAddAdminTask, updateAdminTask as apiUpdateAdminTask, deleteAdminTask as apiDeleteAdminTask } from '@/lib/mock-data';
import type { SocialTask, AdminTask } from '@/lib/types';

// In a real-world application, this would use React Context or a state management library
// like Zustand or Redux to provide data across the component tree.
// For this simulation, we use a simple custom hook that manages its own state.

export const useMockData = () => {
    const [socialTasks, setSocialTasks] = useState<SocialTask[]>(initialSocialTasks);
    const [allTasks, setAllTasks] = useState<AdminTask[]>(initialAllTasks);


    const addSocialTasks = useCallback((newTasks: SocialTask[]) => {
        apiAddSocialTasks(newTasks);
        setSocialTasks([...initialSocialTasks]); 
    }, []);

    const completeSocialTask = useCallback((taskId: number, campaignId: string) => {
        apiCompleteSocialTask(taskId, campaignId);
        setSocialTasks([...initialSocialTasks]);
    }, []);

    const addAdminTask = useCallback((newTask: AdminTask) => {
        apiAddAdminTask(newTask);
        setAllTasks([...initialAllTasks]);
    }, []);

    const updateAdminTask = useCallback((updatedTask: AdminTask) => {
        apiUpdateAdminTask(updatedTask);
        setAllTasks([...initialAllTasks]);
    }, []);

    const deleteAdminTask = useCallback((taskId: string) => {
        apiDeleteAdminTask(taskId);
        setAllTasks([...initialAllTasks]);
    }, []);

    return { 
        socialTasks, 
        addSocialTasks, 
        completeSocialTask,
        allTasks,
        addAdminTask,
        updateAdminTask,
        deleteAdminTask
    };
};
