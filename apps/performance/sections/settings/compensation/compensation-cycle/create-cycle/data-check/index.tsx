'use client'
import { CustomAlert } from "@components/alert";
import CustomCard from "@components/custom-card";
import { CustomGridLayout } from "@components/custom-grid-layout/custom-grid-layout";
import { Box, Button, DialogActions, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";
import ConfirmModal from "./confirm-modal";
import { useDataCheckArray } from "./data";
import { useDataCheck } from "./use-data-check";
import { ThemeModeColor } from "@root/utils";
import { CustomLoader } from "@components/loader";

export function DataCheck({ handleNext, viewDetailId }): JSX.Element {
    const {
        handleCompensationModal,
        isConfirmModalOpen,
        checkList,
        handleConfirm,
        isLoading,
        isDataCheckLoading
    } = useDataCheck({ viewDetailId, handleNext });

    return (
        <>
            <CustomCard
                cardProps={{
                    sx: {
                        minHeight: '65vh'
                    }
                }}
                subHeader cardSubHeader={{
                    title: 'Data Check',
                    description: checkList?.employeePayData === checkList?.totalEmployees ?
                        'Everything looks good. Feel free to continue!'
                        : "We've noticed a few things that aren't assigned correctly. Take a look below.",
                    rootSxCardSubHeader: { fontSize: '20px', pb: '5px', color: ThemeModeColor('neutral.700', 'neutral.300') }
                }}>
                {isDataCheckLoading && <CustomLoader />}
                <CustomAlert
                    message={
                        checkList?.employeePayData === checkList?.totalEmployees ?
                            'The data for the cycle will be locked once you continue to next step.' :
                            <Typography variant="button" textTransform='none'>There are required data missing. Go to the
                                &nbsp;
                                <Link
                                    href='/settings/compensation/employees-pay'
                                    style={{ color: '#4E5BA6', textDecoration: 'none' }}>
                                    Employee pay
                                </Link>
                                &nbsp;
                                page to review and update the data.</Typography>}
                />
                {useDataCheckArray({ checkList }).map((obj) => (
                    <RenderComponent key={obj.id} {...obj} />
                ))}
                <DialogActions sx={{ mt: 2 }}>
                    <Button variant="contained" disabled={checkList?.employeePayData !== checkList?.totalEmployees} onClick={handleCompensationModal}>Continue</Button>
                </DialogActions>
            </CustomCard>
            {isConfirmModalOpen &&
                <ConfirmModal
                    open={isConfirmModalOpen}
                    onClose={handleCompensationModal}
                    handleUnderStand={handleConfirm}
                    checkList={checkList}
                    isLoading={isLoading}
                />}
        </>
    )
}

export function RenderComponent({ title, description, divider, fields }): JSX.Element {
    return (
        <CustomGridLayout
            title={title}
            hideDivider={!divider}
            description={description}
            rootTitleSx={{ fontSize: '16px', fontWeight: 600, pb: '5px', color: ThemeModeColor('neutral.900', 'neutral.300') }}
        >
            <Box
                sx={({ palette: { neutral } }) => ({ borderRadius: '8px', border: `1px solid ${neutral[200]}`, py: '24px', px: '10px' })}
            >
                {fields?.map((field) => (
                    <Grid container spacing={2} key={field?.id}>
                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight={600} color={ThemeModeColor('neutral.700', 'neutral.300')} textAlign='center'>{field?.title}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" fontWeight={400} color='neutral.500' textAlign='center'>{field?.value}</Typography>
                        </Grid>
                        {field?.divider &&
                            <Grid item xs={12}>
                                <Divider sx={{ mb: '20px' }} />
                            </Grid>}
                    </Grid>
                ))}
            </Box>
        </CustomGridLayout>
    )
}