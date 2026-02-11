import { useState } from "react"

interface ReturnType {
    handleDetailsChange?: ({ name, value }: { name: string, value: string }) => void;
    openDeleteModal?: boolean;
    handleDeleteModal?: () => void;
    roleDetails?: { name: string, description: string, permissions: string[] }
}

export function useNewRole(): ReturnType {

    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [roleDetails, setRoleDetails] = useState({ name: '', description: '', permissions: [] });

    function handleDeleteModal(): void {
        setOpenDeleteModal(!openDeleteModal);
    }

    function handleDetailsChange({ name, value }: { name: string, value: string }): void {
        setRoleDetails({ ...roleDetails, [name]: value })
    }

    return {
        handleDetailsChange,
        handleDeleteModal,
        openDeleteModal,
        roleDetails
    }
}