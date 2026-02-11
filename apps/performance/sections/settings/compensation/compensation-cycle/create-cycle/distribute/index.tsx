'use client'
import CustomCard from "@components/custom-card";
import { CustomTableWithHeader } from "@components/custom-table-with-header";
import { CustomLoader } from "@components/loader";
import { LoadingButton } from "@mui/lab";
import { Box, DialogActions, Typography } from "@mui/material";
import { CustomChip } from "@root/../../packages/common";
import { RenderComponent } from "../data-check";
import { useDistribute } from "./use-distribute";

export function Distribute({ handleNext, viewDetailId }): JSX.Element {
    const {
        tableData,
        handleContinue,
        totalBudget,
        totalDistributedBudget,
        isUpdateLoading
    } = useDistribute({ viewDetailId, handleNext });
    return (
        <CustomCard cardProps={{
            sx: { minHeight: '65vh' }
        }}>
            {tableData?.isLoading && <CustomLoader />}
            <RenderComponent
                title={
                    <Box display='flex' alignItems='center' gap='16px' flexWrap='wrap'>
                        <Typography fontWeight={600} fontSize={20} variant="h5">Distribute</Typography>
                        <CustomChip variant="custom" ChipProps={{ label: 'Optional' }} />
                    </Box>}
                description='Distribute additional budget to select leaders. The additional budget awarded will not change any pay guidance you determined when configuring the budget. You can adjust and distribute budget at any time during the cycle.'
                divider={false}
                fields={[
                    { id: '01', title: 'Total Budget', value: `£ ${totalBudget}`, divider: true },
                    { id: '02', title: 'Distributed', value: `£ ${totalDistributedBudget}`, divider: false },
                ]}
            />
            <Box my={1} />
            <CustomTableWithHeader tableProps={tableData} />
            <DialogActions sx={{ mt: 2 }}>
                <LoadingButton loading={isUpdateLoading} variant="contained" onClick={handleContinue}>Continue</LoadingButton>
            </DialogActions>
        </CustomCard>
    )
}