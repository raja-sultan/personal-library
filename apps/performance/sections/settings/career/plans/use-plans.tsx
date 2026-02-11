import { useState } from "react";

interface ReturnType {
    createGroupModal: boolean,
    handleCreateGroupModal: () => void,

}

export function usePlans(): ReturnType {

    const [createGroupModal, setCreateGroupModal] = useState(false);

    function handleCreateGroupModal(): void {
        setCreateGroupModal(!createGroupModal);
    }

    return {
        createGroupModal,
        handleCreateGroupModal,
    }
}