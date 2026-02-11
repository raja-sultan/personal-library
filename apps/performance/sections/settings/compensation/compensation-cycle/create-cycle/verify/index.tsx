'use client'
import React from "react";
import { EditPenIcon } from "@assets/icons";
import CustomCard from "@components/custom-card";
import { Box, Button, DialogActions, FormHelperText, Grid, IconButton, Stack, Typography } from "@mui/material";
import { CustomChip, FormProvider, RHFTextField } from "@root/../../packages/common";
import { useVerify } from "./use-verify";
import { ThemeModeColor } from "@root/utils";
import { LoadingButton } from "@mui/lab";
import { CustomLoader } from "@components/loader";

export function Verify({ handleCurrentTab, viewDetailId }): JSX.Element {

    const {
        handleSubmit,
        methods,
        onSubmit,
        verifyFormValues,
        handleLaunch,
        totalDistributedBudget,
        remainingAmount,
        isLaunchLoading,
        isLoadingData,
    } = useVerify({ viewDetailId });

    return (
        <Box sx={{
            height: '65vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
                width: '0px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'transparent',
            }
        }}>
            {isLoadingData ? <CustomLoader /> :
            <>
                <CustomCard
                    cardProps={{ sx: { mb: '24px' } }}
                    subHeader
                    cardSubHeader={{
                        title: 'Verify',
                        description: 'You’re all set! Review your configurations and launch the cycle. You’ll still be able to adjust individual employee eligibility during the cycle.'
                    }}
                />
                <RenderVerifyComponent
                    title="Setup"
                    fields={[
                        { _id: '1', title: 'Name', value: verifyFormValues?.name },
                        {
                            _id: '2', title: 'Compensation admins', value: verifyFormValues?.adminIds?.length > 0 ?
                                verifyFormValues?.adminIds?.map((emp: string) =>
                                    <Typography
                                        component='span'
                                        key={emp}
                                        variant="subtitle2"
                                        fontWeight={400}
                                        color={ThemeModeColor('neutral.500', 'neutral.300')}
                                        mr='5px'
                                    >
                                        {emp},
                                    </Typography>) : 0
                        },
                    ]}
                    handleIcon={() => { handleCurrentTab(0) }}
                />
                <RenderVerifyComponent
                    title="Rules"
                    fields={[
                        { _id: '1', title: 'Tenure Date', value: verifyFormValues?.tenureStartDate },
                        { _id: '2', title: 'Last raise Date', value: verifyFormValues?.lastRaiseDate },
                        {
                            _id: '3', title: 'Eligible participants', value: verifyFormValues?.eligibleIds
                        },
                        { _id: '4', title: 'Currency', value: verifyFormValues?.currency },
                    ]}
                    handleIcon={() => { handleCurrentTab(1) }}
                />
                <RenderVerifyComponent
                    title="Raise budget"
                    fields={[
                        {
                            _id: '1',
                            title:
                                <Typography color={ThemeModeColor('neutral.500', 'neutral.300')} variant="subtitle1" fontWeight={600}>
                                    Distributed:&nbsp;
                                    <Typography color={ThemeModeColor('neutral.700', 'neutral.400')} variant="subtitle1" fontWeight={600} component='span'>£{totalDistributedBudget?.toFixed(2)}</Typography>
                                </Typography>,
                            value:
                                <Typography color={ThemeModeColor('neutral.500', 'neutral.300')} variant="subtitle1" fontWeight={600}>
                                    Remaining:&nbsp;
                                    <Typography color={ThemeModeColor('neutral.700', 'neutral.400')} variant="subtitle1" fontWeight={600} component='span'>£{remainingAmount.toFixed(2)}</Typography>
                                </Typography>
                        },
                        { _id: '2', title: <Typography fontWeight={600} variant='h6' my='24px'>Promotion raise guidance</Typography> },
                        {
                            _id: '3', title: <Typography color={ThemeModeColor('neutral.500', 'neutral.300')} variant="body2" fontWeight={600}>
                                Total spend:&nbsp;
                                <Typography color={ThemeModeColor('neutral.700', 'neutral.400')} variant="body2" fontWeight={600} component='span'>£ {verifyFormValues?.totalSpend}</Typography>
                            </Typography>, value: <Typography color={ThemeModeColor('neutral.500', 'neutral.300')} variant="subtitle1" fontWeight={400}>
                                Per employee increase:&nbsp;
                                <Typography color={ThemeModeColor('neutral.700', 'neutral.400')} variant="subtitle1" fontWeight={600} component='span'>{verifyFormValues?.perEmployeeIncrease} %</Typography>
                            </Typography>
                        },
                    ]}
                    handleIcon={() => { handleCurrentTab(4) }}
                />
                <RenderVerifyComponent
                    title="Launch Message"
                    requireChip
                    alignItems="flex-start"
                    customFields={
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <Stack gap={2}>
                                <RHFTextField
                                    name='subject'
                                    fullWidth
                                    size='small'
                                    placeholder='Enter subject'
                                    outerLabel='Subject'
                                    variant='outlined'
                                />
                                <Stack gap='0.6rem'>
                                    <RHFTextField
                                        name='body'
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        outerLabel='Body'
                                        placeholder='Enter body...'
                                        minRows={3}
                                        multiline
                                    />
                                    <FormHelperText>This notification will be sent through email and include a sign-in button at the bottom.</FormHelperText>
                                </Stack>
                                <Box>
                                    <Button variant="outlined" type="submit">
                                        Send me a preview
                                    </Button>
                                </Box>
                            </Stack>
                        </FormProvider>
                    }
                />
                {verifyFormValues.status === 'active' && <RenderVerifyComponent
                    title="Approvals"
                    customFields
                    fields={[
                        { _id: '1', title: 'Received', value: `${verifyFormValues?.totalApproved}/${verifyFormValues?.totalParticipants}` },
                    ]}
                />}
                {verifyFormValues?.status === 'draft' && <DialogActions sx={{ mt: 2 }}>
                    <LoadingButton
                        loading={isLaunchLoading}
                        variant='contained'
                        onClick={handleLaunch}
                    >
                        Launch
                    </LoadingButton>
                </DialogActions>}
            </>}
        </Box>
    )
}

function RenderVerifyComponent(
    {
        title,
        handleIcon,
        requireChip,
        customFields,
        fields,
        alignItems = 'center'
    }: {
        title?: string,
        requireChip?: boolean;
        handleIcon?: () => void,
        fields?: { _id?: string, title?: React.ReactNode, value?: React.ReactNode }[],
        customFields?: React.ReactNode,
        alignItems?: string
    }): JSX.Element {
    return (
        <CustomCard
            cardProps={{ sx: { mb: '24px' } }}
        >
            <Grid container spacing={2} alignItems={alignItems} mb='24px'>
                <Grid item sm={4.5} xs={12} display='flex' alignItems='center' gap='10px'>
                    <Typography variant="h6" fontWeight={600}>{title}</Typography>
                    {requireChip && <CustomChip variant="custom" ChipProps={{ label: 'Optional' }} />}
                </Grid>
                <Grid item sm={4.5} xs={12}>
                    {customFields ? customFields :
                        <IconButton onClick={handleIcon}><EditPenIcon /></IconButton>
                    }
                </Grid>
            </Grid>
            {fields?.map((field) => (
                <Grid container spacing={2} alignItems='center' key={field?._id} mb='12px'>
                    <Grid item sm={4.5} xs={12}>
                        <Typography variant="body2" fontWeight={600} color="neutral.900">{field?.title}</Typography>
                    </Grid>
                    <Grid item sm={4.5} xs={12}>
                        <Typography variant="subtitle2" fontWeight={400} color={ThemeModeColor('neutral.500', 'neutral.300')}>{field?.value}</Typography>
                    </Grid>
                </Grid>
            ))}
        </CustomCard>
    )
}