import type React from "react";
import { toast } from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { useGetBudgetQuery, useUpdateCycleMutation } from "@services/compensation/compensation-cycle/compensation-cycle-api";

interface ReturnType {
    handleBudgetIncreaseChange: (val: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleRaiseBudgetChange: (val: number) => (event: React.ChangeEvent<HTMLInputElement>) => void;
    budgetIncrease: number | undefined;
    raiseBudget: number | undefined;
    handleConfirm: () => void;
    promotionIncrease: number | undefined;
    handlePromotionIncreaseChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    updatedBudgetData: {
        eligibleEmployeePay: number,
        increasePerEmployee: number,
        raiseBudget: number,
        employeePromotionCount: number,
        promotionIncrease: number,
        totalSalaryBudget: number,
        totalSpend: number
    },
    totalSpend: number;
    isLoading: boolean;
    isBudgetLoading: boolean;
}

export function useBudget({ viewDetailId, handleNext }): ReturnType {

    const { data: budgetData, isLoading: isBudgetLoading } = useGetBudgetQuery({ id: viewDetailId });
    const [updateCycleMutation, { isLoading }] = useUpdateCycleMutation();

    const budget = budgetData?.data;

    const updatedBudgetData = useMemo(() => {
        return {
            eligibleEmployeePay: budget?.totalBudget ?? 0,
            increasePerEmployee: budget?.budget?.percentage ?? 0,
            raiseBudget: budget?.budget?.raise ?? 0,
            employeePromotionCount: budget?.promotionRaiseGuidanceEmployeesCount ?? 0,
            promotionIncrease: budget?.promotion?.percentage ?? 0,
            totalSalaryBudget: budget?.totalSpend ?? 0,
            totalSpend: budget?.promotion?.totalSpend ?? 0
        }

    }, [budget])

    const [budgetIncrease, setBudgetIncrease] = useState<number | undefined>(updatedBudgetData?.increasePerEmployee);
    const [raiseBudget, setRaiseBudget] = useState<number | undefined>(updatedBudgetData?.raiseBudget);
    const [promotionIncrease, setPromotionIncrease] = useState<number | undefined>(updatedBudgetData?.promotionIncrease);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
        setBudgetIncrease(updatedBudgetData?.increasePerEmployee);
        setRaiseBudget(updatedBudgetData?.raiseBudget);
        setPromotionIncrease(updatedBudgetData?.promotionIncrease);
        setTotalSpend(updatedBudgetData?.totalSpend);
    }, [budget, updatedBudgetData])

    const handleConfirm = async (): Promise<void> => {
        try {
            const obj = {
                stage: 'budget',
                budget: {
                    percentage: budgetIncrease,
                    raise: raiseBudget
                },
                promotion: {
                    employee: updatedBudgetData?.employeePromotionCount,
                    percentage: promotionIncrease,
                    totalSpend
                }
            }
            await updateCycleMutation({ id: viewDetailId, body: obj }).unwrap().then((data) => {
                if (data?.data?._id) {
                    handleNext();
                }
            });
        } catch (error) {
            toast.error(error?.data?.message || 'Error while updating budget')
        }
    }

    function handlePromotionIncreaseChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const val = parseFloat(event.target.value);
        setPromotionIncrease(val);
        const individualIncrementedSalary = (updatedBudgetData?.totalSalaryBudget * (val / 100)) / updatedBudgetData?.employeePromotionCount;
        setTotalSpend(Number((individualIncrementedSalary * updatedBudgetData?.employeePromotionCount).toFixed(2)));
    }

    const handleBudgetIncreaseChange = (budgetVal: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputPercentage = parseFloat(event.target.value);
        const calculatedRaiseBudget: number = (inputPercentage / 100) * budgetVal;
        setBudgetIncrease(inputPercentage);
        setRaiseBudget(calculatedRaiseBudget);
    };

    const handleRaiseBudgetChange = (budgetVal: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = budgetVal + parseFloat(event.target.value);
        const inputRaiseBudget = parseFloat(event.target.value);
        const calculatedRaiseBudgetPercentage: number = ((newAmount - budgetVal) / budgetVal) * 100;
        setRaiseBudget(inputRaiseBudget);
        setBudgetIncrease(Number(calculatedRaiseBudgetPercentage.toFixed(2)));
    };

    return {
        handleBudgetIncreaseChange,
        handleRaiseBudgetChange,
        budgetIncrease,
        raiseBudget,
        handleConfirm,
        promotionIncrease,
        handlePromotionIncreaseChange,
        updatedBudgetData,
        totalSpend,
        isLoading,
        isBudgetLoading
    }
}