import { useState } from "react";
import { useGetDataCheckQuery, useGetSingleCompensationCycleQuery, useUpdateCycleMutation } from "@services/compensation/compensation-cycle/compensation-cycle-api";
import { toast } from "react-hot-toast";

interface CheckList {
    assignedCurrencies: number | null | string;
    compensationCycleCount: number | null | string;
    employeePayData: number | null | string;
    promotionDecision: number | null | string;
    totalEmployees: number | null | string;
}
interface ReturnType {
    isConfirmModalOpen: boolean;
    handleCompensationModal: () => void;
    handleConfirm: () => void;
    checkList?: CheckList;
    isLoading: boolean;
    isDataCheckLoading: boolean;
}


export function useDataCheck({ viewDetailId, handleNext }): ReturnType {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { data: singleCycle } = useGetSingleCompensationCycleQuery({ id: viewDetailId });
    const { data: dataCheck, isLoading: isDataCheckLoading } = useGetDataCheckQuery({ id: viewDetailId, employeeIds: singleCycle?.data?.eligibleIds });
    const [updateCycleMutation, { isLoading }] = useUpdateCycleMutation();

    const checkList: CheckList = {
        assignedCurrencies: dataCheck?.data?.assignedCurrencies ?? 'N/A',
        compensationCycleCount: dataCheck?.data?.compensationCycleCount ?? 'N/A',
        employeePayData: dataCheck?.data?.employeePayData ?? 'N/A',
        promotionDecision: dataCheck?.data?.promotionDecision ?? 'N/A',
        totalEmployees: dataCheck?.data?.totalEmployees ?? 'N/A',
    };

    const handleCompensationModal = (): void => {
        setIsConfirmModalOpen(!isConfirmModalOpen)
    };

    const handleConfirm = async (): Promise<void> => {
        try {
            await updateCycleMutation({ id: viewDetailId, body: { stage: 'data check' } }).unwrap().then((data) => {
                if (data?.data?._id) {
                    handleNext();
                    handleCompensationModal();
                }
            });
        } catch (error) {
            toast.error(error?.data?.message || 'Error while updating data check')
        }
    }

    return {
        handleCompensationModal,
        isConfirmModalOpen,
        checkList,
        handleConfirm,
        isLoading,
        isDataCheckLoading
    }
}