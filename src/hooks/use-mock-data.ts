

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
    addWithdrawalRequest as apiAddWithdrawalRequest,
    updateWithdrawalRequest as apiUpdateWithdrawalRequest,
    initialBuyers,
    updateCampaign as apiUpdateCampaign
} from '@/lib/mock-data';
import type { SocialTask, AdminTask, AdminEmployee, AdminWithdrawalRequest, AdminBuyer, AdminCampaign } from '@/lib/types';

export const useMockData = () => {
    const [socialTasks, setSocialTasks] = useState<SocialTask[]>([]);
    const [allTasks, setAllTasks] = useState<AdminTask[]>([]);
    const [employees, setEmployees] = useState<AdminEmployee[]>([]);
    const [withdrawalRequests, setWithdrawalRequests] = useState<AdminWithdrawalRequest[]>([]);
    const [buyers, setBuyers] = useState<AdminBuyer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // A simple dependency trigger for re-fetching data
    const [dependency, setDependency] = useState(0);

    const refetch = useCallback(() => {
        setDependency(prev => prev + 1);
    }, []);

    useEffect(() => {
        // This effect re-fetches all data from the source whenever 'dependency' changes.
        // This simulates a full refresh from a database.
        setIsLoading(true);
        const timer = setTimeout(() => {
            setSocialTasks([...initialSocialTasks]);
            setAllTasks([...initialAllTasks]);
            setEmployees([...initialEmployees]);
            setWithdrawalRequests([...initialWithdrawalRequests]);
            setBuyers([...initialBuyers]);
            setIsLoading(false);
        }, 100); 
        return () => clearTimeout(timer);
    }, [dependency]);

    const addSocialTasks = useCallback((newTasks: SocialTask[]) => {
        apiAddSocialTasks(newTasks);
        refetch();
    }, [refetch]);

    const completeSocialTask = useCallback((taskId: number, campaignId: string) => {
        apiCompleteSocialTask(taskId, campaignId);
        refetch();
    }, [refetch]);

    const addAdminTask = useCallback((newTask: AdminTask) => {
        apiAddAdminTask(newTask);
        refetch();
    }, [refetch]);

    const updateAdminTask = useCallback((updatedTask: AdminTask) => {
        apiUpdateAdminTask(updatedTask);
        refetch();
    }, [refetch]);

    const deleteAdminTask = useCallback((taskId: string) => {
        apiDeleteAdminTask(taskId);
        refetch();
    }, [refetch]);

    const updateEmployee = useCallback((employeeId: string, updates: Partial<AdminEmployee>) => {
        apiUpdateEmployee(employeeId, updates);
        refetch();
    }, [refetch]);

    const addWithdrawalRequest = useCallback((request: AdminWithdrawalRequest) => {
        apiAddWithdrawalRequest(request);
        refetch();
    }, [refetch]);

    const updateWithdrawalRequest = useCallback((requestId: string, updates: Partial<AdminWithdrawalRequest>) => {
        apiUpdateWithdrawalRequest(requestId, updates);
        refetch();
    }, [refetch]);

    const updateCampaign = useCallback((buyerId: string, campaignId: string, updates: Partial<AdminCampaign>) => {
        apiUpdateCampaign(buyerId, campaignId, updates);
        refetch();
    }, [refetch]);

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
        addWithdrawalRequest,
        updateWithdrawalRequest,
        buyers,
        updateCampaign,
        isLoading
    };
};
