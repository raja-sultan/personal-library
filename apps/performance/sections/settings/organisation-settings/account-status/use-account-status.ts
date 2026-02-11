import { useState } from "react";

interface ReturnType {
    handleChangeUrl?: () => void;
    handleDeactivateUser?: () => void;
    changeUrlModal?: boolean;
    deactivateUser?: boolean;
}

export function useAccountStatus(): ReturnType {
    const [changeUrlModal, setChangeUrlModal] = useState(false);

    const [deactivateUser, setDeactivateUser] = useState(false);

    function handleChangeUrl(): void {
        setChangeUrlModal(!changeUrlModal)
    }
    function handleDeactivateUser(): void {
        setDeactivateUser(!deactivateUser)
    }

    return {
        changeUrlModal,
        handleChangeUrl,
        deactivateUser,
        handleDeactivateUser
    }
}