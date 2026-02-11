import { useState } from "react";

interface ReturnType {
    steps?: { name: string; formField: string; }[];
    active?: number;
    nextStepHandler?: () => void;
    previousStepHandler?: () => void;
    rejectText?: string;
}

export function useRequestModal(): ReturnType {
    const steps = [
        { name: 'Question 1', formField: 'appConnectToPL' },
        { name: 'Question 2', formField: 'integrationEnabled' },
        { name: 'Question 3', formField: 'dataSend' },
        { name: 'Question 4', formField: 'benefitAutomation' },
        { name: 'Question 5', formField: 'teamPeople' }
    ];
    const [active, setActive] = useState(0);

    let rejectText = '';
    if (active === 0) { rejectText = 'Cancel' }
    else { rejectText = 'Back' }

    const nextStepHandler = (): void => {
        setActive(active < steps.length - 1 ? active + 1 : 0);
    };
    const previousStepHandler = (): void => {
        setActive(active > 0 ? active - 1 : 0);
    };

    return {
        steps,
        active,
        nextStepHandler,
        previousStepHandler,
        rejectText
    }
}