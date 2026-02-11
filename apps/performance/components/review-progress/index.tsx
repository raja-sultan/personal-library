'use client'

import { Box, Divider, Grid, LinearProgress, Typography, useTheme } from "@mui/material"

interface Props {
    title?: string;
    reviewSubmitted?: { total: number, outOf: number, percentage: number };
    completed?: { percentage: number, totalReviews: number };
    notStarted?: { percentage: number, totalReviews: number };
}

export function ReviewProgress(props: Props): JSX.Element {
    const {
        title,
        reviewSubmitted,
        completed,
        notStarted
    } = props;

    const { palette: { success, warning, neutral } } = useTheme();

    const badgeStyle = {
        'Completed': success.main,
        'In-Progress': warning.main,
        'Not-Started': neutral[500]
    }

    const reviewsArr = [
        { type: 'Completed', ...completed },
        { type: 'Not-Started', ...notStarted }
    ];

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={4} xs={12}>
                    <Typography variant="body2" fontWeight={600} color='neutral.900' textTransform='capitalize'>{title}</Typography>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Box display='flex' alignItems='center' justifyContent='space-between' flexWrap='wrap' gap='16px'>
                        <Typography variant="subtitle2" fontWeight={400} color='neutral.500'>
                            {reviewSubmitted?.outOf} of {reviewSubmitted?.total} reviews submitted
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={400} color='neutral.800'>
                            {reviewSubmitted?.percentage}% complete
                        </Typography>
                    </Box>
                    <LinearProgress
                        value={reviewSubmitted?.outOf}
                        variant="determinate"
                        classes={{ bar: '_bar' }}
                        sx={{ height: '12px', mb: '8px', borderRadius: '50px', '& ._bar': { borderRadius: '5px' } }}
                    />
                    {reviewsArr.map((reviews) => (
                        <Box key={reviews.type} display='flex' alignItems='center' justifyContent='space-between' flexWrap='wrap' gap='16px' my='16px'>
                            <Typography variant="body2" fontWeight={600} color='neutral.700'>{reviews.type} - {reviews?.percentage}%</Typography>
                            <Typography variant="body2" fontWeight={500} color='neutral.500' display='flex' alignItems='center' gap='5px'>
                                <Typography component='span' sx={{ background: badgeStyle[reviews.type], height: 8, width: 8, borderRadius: '2px', display: 'inline-block' }} />
                                {reviews?.totalReviews} reviews
                            </Typography>
                        </Box>
                    ))}
                </Grid>
            </Grid>
            <Divider sx={{ mb: '20px' }} />
        </>
    )
}