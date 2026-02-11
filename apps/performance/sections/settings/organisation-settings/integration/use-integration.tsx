import { useState } from "react"

interface ReturnType {
    connectModal?: boolean;
    handleConnectModal?: () => void;
    handleStatusChange?: (obj: object) => void;
    companyName?: string;
    handleDetailModal?: () => void;
    detailModal?: boolean;
    requestModal?: boolean;
    handleRequest?: () => void;
}

export function UseIntegration(): ReturnType {

    const [connectModal, setConnectModal] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [requestModal, setRequestModal] = useState(false);
    const [companyName, setCompanyName] = useState('');

    function handleConnectModal(): void {
        setConnectModal(!connectModal)
    }

    function handleDetailModal(): void {
        setDetailModal(!detailModal)
    }

    function handleRequest(): void {
        setRequestModal(!requestModal)
    }
    function handleDisconnect(id: string): void { id }

    function handleStatusChange(obj): void {
        setCompanyName(obj.title)
        switch (obj.status) {
            case 'connect':
                handleConnectModal();
                break;
            case 'disconnect':
                handleDisconnect(obj.id);
                break;
            case 'request':
                handleRequest();
                break;
            default:
                break;
        }
    }

    return {
        connectModal,
        handleConnectModal,
        handleStatusChange,
        companyName,
        handleDetailModal,
        detailModal,
        requestModal,
        handleRequest
    }
}