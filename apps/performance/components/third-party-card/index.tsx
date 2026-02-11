'use client'

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { thirdPartyStyles } from './third-party.styles';

interface Props {
    icon?: React.ReactNode;
    title?: React.ReactNode;
    description?: React.ReactNode;
    status?: string;
    onClick?: () => void;
}

export function ThirdPartyCard(props: Props): JSX.Element {
    const {
        icon = '',
        title = '',
        description = '',
        status = 'connect',
        onClick = () => { }
    } = props;

    const styles = thirdPartyStyles()

    return (
        <Box sx={styles.wrapper}>
            {icon}
            <Typography variant='h6' fontWeight={600} sx={styles.title}>
                {title}
            </Typography>
            <Typography variant='subtitle1' fontWeight={400} color="text.secondary" sx={styles.description}>
                {description}
            </Typography>
            <Button
                fullWidth
                size='small'
                variant={status === 'disconnect' ? 'outlined' : 'contained'}
                onClick={onClick}
                sx={styles.btn}
            >
                {status}
            </Button>
        </Box>
    )
}