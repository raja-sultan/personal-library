import React, { useEffect, useState } from "react";
import { useEndCycleMutation, useLazyGetSingleCompensationCycleQuery } from "@services/compensation/compensation-cycle/compensation-cycle-api";
import { Budget } from "../budget";
import { DataCheck } from "../data-check";
import { Distribute } from "../distribute";
import { Participants } from "../participants";
import { Rules } from "../rules";
import { SetUp } from "../setup";
import { Verify } from "../verify";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface ReturnType {
    activeStep: number;
    steps: { label: string, component: React.ReactNode | JSX.Element }[];
    handleNext?: () => void;
    handleCurrentTab?: (currTab: number) => void;
    status: string;
    handleEndCycle: () => void;
    onBack: () => void;
    isEndCycleLoading: boolean;
    isCycleLoading: boolean;
    handleStepChange: (curr: number) => void;
}

export function useStepper(): ReturnType {
    const viewDetailId = useSearchParams().get('id');
    const [activeStep, setActiveStep] = useState<number>(0);
    const [currency, setCurrency] = useState<object | null>(null);
    const [getCompensation, { isLoading: isCycleLoading }] = useLazyGetSingleCompensationCycleQuery();
    const [endCycleMutation, { isLoading: isEndCycleLoading }] = useEndCycleMutation();
    const [status, setStatus] = useState('');
    const router = useRouter();

    const handleNext = (): void => {
        setActiveStep((prevActiveStep) => prevActiveStep === steps.length - 1 ? prevActiveStep : prevActiveStep + 1);
    };

    const handleCurrentTab = (currTab: number): void => {
        setActiveStep(currTab)
    };

    const handleStepChange = (currTab: number): void => {
        if (viewDetailId) {
            if (currTab < activeStep) {
                setActiveStep(currTab)
            }
        }
    };

    function onBack(): void {
        router.push('/settings/compensation/compensation-cycle')
    }

    async function handleEndCycle(): Promise<void> {
        try {
            await endCycleMutation({ id: viewDetailId }).unwrap().then((data) => {
                if (data?.data) {
                    toast.success('Cycle ended successfully');
                    onBack();
                }
            })
        } catch (error) {
            toast.error(error?.data?.message || 'Error while ending cycle')
        }
    }

    const steps = [
        {
            label: 'Setup',
            component: <SetUp handleNext={handleNext} viewDetailId={viewDetailId} />
        },
        {
            label: 'Rules',
            component: <Rules handleNext={handleNext} viewDetailId={viewDetailId} currency={currency} />
        },
        {
            label: 'Participants',
            component: <Participants handleNext={handleNext} viewDetailId={viewDetailId} currency={currency} />
        },
        {
            label: 'Data Check',
            component: <DataCheck handleNext={handleNext} viewDetailId={viewDetailId} />
        },
        {
            label: 'Budget',
            component: <Budget handleNext={handleNext} viewDetailId={viewDetailId} />
        },
        {
            label: 'Distribute',
            component: <Distribute handleNext={handleNext} viewDetailId={viewDetailId} />
        },
        {
            label: 'Verify',
            component: <Verify handleCurrentTab={handleCurrentTab} viewDetailId={viewDetailId} />
        }
    ];

    useEffect(() => {
        if (viewDetailId) {
            getCompensation({ id: viewDetailId }).unwrap().then((data) => {
                setCurrency(data?.data?.currency);
                const currStep = steps.findIndex((step) => step.label.toLowerCase() === data?.data?.stage?.toLowerCase());
                setActiveStep(currStep === steps.length - 1 ? currStep : currStep + 1);
                setStatus(data?.data?.status);
            })
        }
    }, [getCompensation, viewDetailId]);

    return {
        activeStep,
        steps,
        handleNext,
        handleCurrentTab,
        status,
        handleEndCycle,
        onBack,
        isEndCycleLoading,
        isCycleLoading,
        handleStepChange
    }
}