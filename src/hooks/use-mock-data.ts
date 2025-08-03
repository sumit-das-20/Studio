
'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
    initialSocialTasks, 
    addSocialTasks as apiAddSocialTasks, 
    completeSocialTask as apiCompleteSocialTask, 
    initialAllTasks, 
    addAdminTask as apiAddAdminTask, 
    updateAdminTask as apiUpdateAdminTask, 
    deleteAdminTask as apiDeleteAdminTask,
    initialEmployees,
    updateEmployee as apiUpdateEmployee,
    initialWithdrawalRequests,
    updateWithdrawalRequest as apiUpdateWithdrawalRequest
} from '@/lib/mock-data';
import type { SocialTask, AdminTask, AdminEmployee, AdminWithdrawalRequest } from '@/lib/types';

export const useMockData = () => {
    const [socialTasks, setSocialTasks] = useState<SocialTask[]>([]);
    const [allTasks, setAllTasks] = useState<AdminTask[]>([]);
    const [employees, setEmployees] = useState<AdminEmployee[]>([]);
    const [withdrawalRequests, setWithdrawalRequests] = useState<AdminWithdrawalRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial data fetch
        const timer = setTimeout(() => {
            setSocialTasks(initialSocialTasks);
            setAllTasks(initialAllTasks);
            setEmployees(initialEmployees);
            setWithdrawalRequests(initialWithdrawalRequests);
            setIsLoading(false);
        }, 500); // Reduced delay
        return () => clearTimeout(timer);
    }, []);

    const addSocialTasks = useCallback((newTasks: SocialTask[]) => {
        apiAddSocialTasks(newTasks);
        setSocialTasks(prev => [...newTasks, ...prev]); 
    }, []);

    const completeSocialTask = useCallback((taskId: number, campaignId: string) => {
        apiCompleteSocialTask(taskId, campaignId);
        // This is tricky without a full state management solution.
        // For now, we'll just have to rely on the mock data file being the source of truth
        // and re-initializing won't show the change immediately.
        // In a real app, this would be an API call and a state update.
    }, []);

    const addAdminTask = useCallback((newTask: AdminTask) => {
        apiAddAdminTask(newTask);
        setAllTasks(prev => [newTask, ...prev]);
    }, []);

    const updateAdminTask = useCallback((updatedTask: AdminTask) => {
        apiUpdateAdminTask(updatedTask);
        setAllTasks(prevTasks => prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    }, []);

    const deleteAdminTask = useCallback((taskId: string) => {
        apiDeleteAdminTask(taskId);
        setAllTasks(prev => prev.filter(task => task.id !== taskId));
    }, []);

    const updateEmployee = useCallback((employeeId: string, updates: Partial<AdminEmployee>) => {
        apiUpdateEmployee(employeeId, updates);
        setEmployees(prev => prev.map(emp => emp.id === employeeId ? { ...emp, ...updates } : emp));
    }, []);

    const updateWithdrawalRequest = useCallback((requestId: string, updates: Partial<AdminWithdrawalRequest>) => {
        apiUpdateWithdrawalRequest(requestId, updates);
        setWithdrawalRequests(prev => prev.map(req => req.id === requestId ? { ...req, ...updates } : req));
    }, []);

    return { 
        socialTasks, 
        addSocialTasks, 
        completeSocialTask,
        allTasks,
        addAdminTask,
        updateAdminTask,
        deleteAdminTask,
        employees,
        updateEmployee,
        withdrawalRequests,
        updateWithdrawalRequest,
        isLoading
    };
};
