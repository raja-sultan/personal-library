import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useDeleteKeyResultByIdMutation, useUpdateKeyResultCheckInMutation } from "@services/goals/goals.api";
import toast from "react-hot-toast";

export interface UseKeyResultReturnType {
    handleDeleteUserModal: () => void;
    deleteUser: boolean;
    setDeleteUser: Dispatch<SetStateAction<boolean>>;
    isCheckIn: boolean;
    setIsCheckIn?: Dispatch<SetStateAction<boolean>>;
    checkInHandler: (val: object) => void;
    handleCheckInModal: () => void;
    currKey?: object | any;
    handleDelete: (id: string) => void;
    handleDeleteUserConfirm: () => void;
    goalId?: string;
    handleIncrease: (val: number) => void
    handleDecrease: (val: string) => void
    handleBinaryChange: (val: boolean) => void
    handleSave: () => void;
    isUpdateKeyResultLoading: boolean
    isDeleteLoading: boolean

}

export function useKeyResults(goalId: string | null): UseKeyResultReturnType {
    const [isCheckIn, setIsCheckIn] = useState(false);
    const [deleteUser, setDeleteUser] = useState<boolean>(false);
    const [currKey, setCurrKey] = useState<any>({});
    const [deleteId, setDeleteId] = useState('');
    const [keyResultValue, setKeyResultValue] = useState<number | null>();
    const [isBinary, setIsBinary] = useState(true);
    // api calls
    const [deleteKeyResult, { isLoading: isDeleteLoading }] = useDeleteKeyResultByIdMutation()
    const [updateKeyResultCheckIn, { isLoading: isUpdateKeyResultLoading }] = useUpdateKeyResultCheckInMutation()

    function handleCheckInModal(): void {
        setIsCheckIn(!isCheckIn)
    }
    const checkInHandler = (obj): void => {
        setCurrKey(obj)
        handleCheckInModal()

    };

    function handleDelete(id: string): void {
        handleDeleteUserModal();
        setDeleteId(id)
    }

    const handleDeleteUserModal = (): void => {
        setDeleteUser(!deleteUser);
    }

    async function handleDeleteUserConfirm(): Promise<void> {
        try {
            await deleteKeyResult({
                id: deleteId,
                keyResultId: goalId
            }).unwrap();
            toast.success("key result deleted successful!");
            setDeleteUser(!deleteUser);
        } catch (error) {
            toast.error(error?.data?.message || "Error While Deleting key result");
        }
    }

    function handleBinaryChange(binary: boolean): void {
        setIsBinary(binary)
    }
    function handleIncrease(val: number): void {
        setKeyResultValue(val<0 ? -val : val);
    }
    function handleDecrease(): void {
        // setKeyResultValue(val);
    }
    async function handleSave(): Promise<void> {
        const obj = {
            increase: isBinary,
            newValue: keyResultValue
        }
        try {
            await updateKeyResultCheckIn({ id: goalId, keyResultId: currKey?._id, body: obj }).unwrap().then((data) => {
                if (data?.data) {
                    handleCheckInModal()
                }
            });
            toast.success("Key result check-in updated successfully");
        } catch (error) {
            toast.error(error?.data?.message || "Error While updating key result check-in");
        }
    }
    return {
        checkInHandler,
        handleDeleteUserModal,
        isCheckIn,
        deleteUser,
        setDeleteUser,
        handleCheckInModal,
        handleDelete,
        handleDeleteUserConfirm,
        currKey,
        handleDecrease,
        handleIncrease,
        handleBinaryChange,
        handleSave,
        isUpdateKeyResultLoading,
        isDeleteLoading
    };
}