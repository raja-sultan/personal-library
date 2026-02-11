'use client';

import React from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CustomModal from '@components/custom-modal';

interface Props {
    open?: boolean;
    onClose?: () => void;
    headerIcon?: React.ReactNode;
    title?: React.ReactNode;
    handleAcceptClick?: () => void;
    children?: React.ReactNode;
}

export function ConnectModal(props: Props): JSX.Element {
    const {
        open,
        onClose,
        headerIcon = <ErrorOutlineIcon color='primary' />,
        title,
        handleAcceptClick,
        children
    } = props;
    return (
        <CustomModal
            open={open}
            onClose={onClose}
            headerIcon={headerIcon}
            title={title}
            message={false}
            acceptText='Connect'
            acceptButtonProps={{
                color: 'primary',
                onClick: handleAcceptClick
            }}
        >
            {children}
        </CustomModal>
    )
} 