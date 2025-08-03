

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
    updateBuyer as apiUpdateBuyer,
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

    useEffect(() => {
        // Simulate initial data fetch
        const timer = setTimeout(() => {
            setSocialTasks(initialSocialTasks);
            setAllTasks(initialAllTasks);
            setEmployees(initialEmployees);
            setWithdrawalRequests(initialWithdrawalRequests);
            setBuyers(initialBuyers);
            setIsLoading(false);
        }, 500); // Reduced delay
        return () => clearTimeout(timer);
    }, []);

    const addSocialTasks = useCallback((newTasks: SocialTask[]) => {
        apiAddSocialTasks(newTasks);
        setSocialTasks(prev => [...newTasks, ...prev]); 
        setAllTasks(initialAllTasks); // Refresh allTasks from source
    }, []);

    const completeSocialTask = useCallback((taskId: number, campaignId: string) => {
        apiCompleteSocialTask(taskId, campaignId);
        setBuyers([...initialBuyers]); // Refresh buyers from source
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

    const addWithdrawalRequest = useCallback((request: AdminWithdrawalRequest) => {
        apiAddWithdrawalRequest(request);
        setWithdrawalRequests(prev => [request, ...prev]);
    }, []);

    const updateWithdrawalRequest = useCallback((requestId: string, updates: Partial<AdminWithdrawalRequest>) => {
        apiUpdateWithdrawalRequest(requestId, updates);
        setWithdrawalRequests(prev => prev.map(req => req.id === requestId ? { ...req, ...updates } : req));
    }, []);

    const updateCampaign = useCallback((buyerId: string, campaignId: string, updates: Partial<AdminCampaign>) => {
        apiUpdateCampaign(buyerId, campaignId, updates);
        setBuyers([...initialBuyers]);
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
        addWithdrawalRequest,
        updateWithdrawalRequest,
        buyers,
        updateCampaign,
        isLoading
    };
};
