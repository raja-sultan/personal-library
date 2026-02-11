'use client'
import React from 'react';
import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import { taskToComplete } from './task-to-complete.styles';
import { DashboardCard } from '@components/dashboard/dashboard-card';
import { useGetTaskToCompleteQuery } from "@services/dashboard/dashboard-api";
import DashboardRightArrowIcon from '@assets/icons/dashboard-right-arrow-icon';
import { ComponentLoader } from '@components/component-loader';

interface TaskData { meetingId: string, path: string, item: string, text: string, type: string }

export function TaskToComplete(): JSX.Element {
    const styles = taskToComplete();
    const { data, isLoading } = useGetTaskToCompleteQuery({});

    const renderLinks = (type: string): string => {
        let path = '';
        if (type.includes('meeting')) path = '/one-on-ones';
        if (type.includes('goal')) path = '/goals';
        return path
    }

    const taskData = data?.data?.map((obj: TaskData) => {
        return { ...obj, path: renderLinks(obj?.type) }
    })

    return (
        <DashboardCard>
            <Box sx={styles.wrapper}>
                <Typography variant='h5' fontWeight={600} color="text.primary" sx={styles.title}>Tasks to complete</Typography>
                <Grid container spacing={1.2} sx={styles.gridWrapper}>
                    {isLoading ? <ComponentLoader sx={{ width: '100%' }} /> :
                        taskData?.map((item: TaskData) => {
                            return (
                                <Grid item xs={12} xl={12} key={item?.meetingId} sx={styles.innerCardGridWrap}>
                                    <Box sx={styles.innerCardWrap}>
                                        <Link href={item?.path ?? ""} style={styles.linkStyles}>
                                            <Box sx={styles.boxWrap}>
                                                <Box>
                                                    <Typography variant='body2' fontWeight={600} color="text.primary" sx={styles.cardTitle}>
                                                        {item?.text}
                                                    </Typography>
                                                    <Typography variant='subtitle2' fontWeight={400} color="text.secondary" sx={styles.cardDescription}>
                                                        {item?.type?.replace(/_/g, ' ')}
                                                    </Typography>
                                                </Box>
                                                <DashboardRightArrowIcon sx={styles.iconStyles} />
                                            </Box>
                                        </Link>
                                    </Box>
                                </Grid>
                            )
                        })}
                </Grid>
            </Box>
        </DashboardCard>
    )
}
