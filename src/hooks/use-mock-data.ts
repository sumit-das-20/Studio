
'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
    socialTasks as initialSocialTasks, 
    addSocialTasks as apiAddSocialTasks, 
    completeSocialTask as apiCompleteSocialTask, 
    allTasks as initialAllTasks, 
    addAdminTask as apiAddAdminTask, 
    updateAdminTask as apiUpdateAdminTask, 
    deleteAdminTask as apiDeleteAdminTask,
    employees as initialEmployees,
    updateEmployee as apiUpdateEmployee,
    withdrawalRequests as initialWithdrawalRequests,
    updateWithdrawalRequest as apiUpdateWithdrawalRequest
} from '@/lib/mock-data';
import type { SocialTask, AdminTask, AdminEmployee, AdminWithdrawalRequest } from '@/lib/types';

export const useMockData = () => {
    const [socialTasks, setSocialTasks] = useState<SocialTask[]>(initialSocialTasks);
    const [allTasks, setAllTasks] = useState<AdminTask[]>(initialAllTasks);
    const [employees, setEmployees] = useState<AdminEmployee[]>(initialEmployees);
    const [withdrawalRequests, setWithdrawalRequests] = useState<AdminWithdrawalRequest[]>(initialWithdrawalRequests);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial data fetch
        const timer = setTimeout(() => {
            setSocialTasks(initialSocialTasks);
            setAllTasks(initialAllTasks);
            setEmployees(initialEmployees);
            setWithdrawalRequests(initialWithdrawalRequests);
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

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

    const updateEmployee = useCallback((employeeId: string, updates: Partial<AdminEmployee>) => {
        apiUpdateEmployee(employeeId, updates);
        setEmployees([...initialEmployees]);
    }, []);

    const updateWithdrawalRequest = useCallback((requestId: string, updates: Partial<AdminWithdrawalRequest>) => {
        apiUpdateWithdrawalRequest(requestId, updates);
        setWithdrawalRequests([...initialWithdrawalRequests]);
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
