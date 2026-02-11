'use client'
import React from "react";
import { Box, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export function CustomAlert(
    {
        icon = <InfoOutlinedIcon sx={{ transform: 'rotate(180deg)', color: 'primary.main' }} />,
        message,
        bgColor,
        removeMargin,
        sx = {},
    }: {
        icon?: React.ReactNode,
        message?: React.ReactNode,
        bgColor?: string,
        removeMargin?: boolean,
        sx?: any,
    }): JSX.Element {
    return (
        <Box display='inline-flex' alignItems='center' width='100%' gap='12px' mb={removeMargin ? 0 : '24px'}
            sx={({ palette: { primary } }) => ({
                background: bgColor ?? primary.lightest,
                borderRadius: '6px',
                padding: '16px',
                ...sx
            })}
        >
            {icon}
            <Typography variant="subtitle2" fontWeight={600} color='neutral.700'>{message}</Typography>
        </Box>
    )
}