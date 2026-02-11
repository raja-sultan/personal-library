import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetEmployeesQuery } from '@services/login-as';
import type { UseFormHandleSubmit, SubmitHandler, UseFormReturn } from 'react-hook-form'
import { useGetBudgetQuery, useGetDistributeQuery, useGetSingleCompensationCycleQuery, useUpdateCycleMutation } from '@services/compensation/compensation-cycle/compensation-cycle-api';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { useEffect } from 'react';

interface FormValues {
    subject: string;
    body: string
}
interface ReturnType {
    handleSubmit: UseFormHandleSubmit<FormValues>,
    onSubmit: SubmitHandler<FormValues>,
    methods: UseFormReturn<FormValues>,
    verifyFormValues: {
        name: string,
        adminIds: string[] | [],
        tenureStartDate: string,
        lastRaiseDate: string,
        eligibleIds: string | number,
        currency: string,
        perEmployeeIncrease: number | string,
        totalSpend: number | string,
        totalApproved: number,
        totalParticipants: number,
        status: string | undefined
    },
    employeesList: string[] | [],
    handleLaunch: () => void;
    totalDistributedBudget: number;
    remainingAmount: number;
    isLaunchLoading: boolean;
    isLoadingData: boolean;
}

export function useVerify({ viewDetailId }): ReturnType {

    const router = useRouter();

    const { data: verifyData, isLoading: isVerifyLoading } = useGetSingleCompensationCycleQuery({ id: viewDetailId });
    const { data: employees } = useGetEmployeesQuery({ type: 'employees' });
    const [updateCycleMutation, { isLoading: isLaunchLoading }] = useUpdateCycleMutation();
    const { data: distributeData, isLoading: isDistributeLoading } = useGetDistributeQuery({ id: viewDetailId });
    const { data: budgetData, isLoading: isBudgetLoading } = useGetBudgetQuery({ id: viewDetailId });

    const isLoadingData = isVerifyLoading || isDistributeLoading || isBudgetLoading;

    const totalDistributedBudget = distributeData?.data.reduce((total: number, department: { distributedBudget: number }) => total + department.distributedBudget, 0);

    const totalBudget = Number(budgetData?.data?.totalBudget + budgetData?.data?.budget?.raise + budgetData?.data?.promotion?.totalSpend).toFixed(2);
    const remainingAmount = Number(totalBudget) - totalDistributedBudget

    const employeesList = employees?.data?.filter(({ value }: { value: string }) =>
        verifyData?.data?.adminIds?.includes(value))?.map(({ text }) => text) ?? [];

    const verifyFormValues = {
        name: verifyData?.data?.name ?? '--',
        adminIds: employeesList,
        tenureStartDate: verifyData?.data?.tenureStartDate ? dayjs(verifyData?.data?.tenureStartDate).format('MMM DD, YYYY') : '--',
        lastRaiseDate: verifyData?.data?.lastRaiseDate ? dayjs(verifyData?.data?.lastRaiseDate).format('MMM DD, YYYY') : '--',
        eligibleIds: verifyData?.data?.eligibleIds?.length ?? '--',
        currency: verifyData?.data?.currency ?? '--',
        perEmployeeIncrease: verifyData?.data?.promotion?.percentage ?? 0,
        totalSpend: verifyData?.data?.promotion?.totalSpend ?? 0,
        totalApproved: verifyData?.data?.totalApproved ?? 0,
        totalParticipants: verifyData?.data?.totalParticipants ?? 0,
        status: verifyData?.data?.status
    }

    const methods = useForm<FormValues>({
        resolver: yupResolver(Yup.object().shape({
            subject: Yup.string().required('Field is required'),
            body: Yup.string().required('Field is required'),
        })),
        defaultValues: {
            subject: '',
            body: ''
        }
    });

    const { handleSubmit, reset } = methods;

    useEffect(() => {
        if (verifyData?.data?.launchMessage) {
            reset({
                subject: verifyData?.data?.launchMessage?.subject ?? '',
                body: verifyData?.data?.launchMessage?.body ?? ''
            })
        }
    }, [verifyData, reset])


    async function onSubmit(launchMessage: FormValues): Promise<void> {
        try {
            await updateCycleMutation({
                id: viewDetailId,
                body: { launchMessage, stage: 'verify' }
            }).unwrap().then((data) => {
                if (data?.data) {
                    toast.success('Launch message sent successfully');
                    reset();
                }
            })
        } catch (error) {
            toast.error(error?.data?.message || 'Error while sending message')
        }
    }

    async function handleLaunch(): Promise<void> {
        try {
            await updateCycleMutation({ id: viewDetailId, body: { stage: 'verify' } }).unwrap().then((data) => {
                if (data?.data?._id) {
                    toast.success('Compensation cycle launched successfully')
                    router.push('/settings/compensation/compensation-cycle')
                }
            });
        } catch (error) {
            toast.error(error?.data?.message || 'Error while launching cycle')
        }
    }

    return {
        handleSubmit,
        methods,
        onSubmit,
        verifyFormValues,
        employeesList,
        handleLaunch,
        remainingAmount,
        totalDistributedBudget,
        isLaunchLoading,
        isLoadingData
    }
}