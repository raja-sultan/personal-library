'use client'
import React from "react";
import CustomCard from "@components/custom-card";
import { CustomGridLayout } from "@components/custom-grid-layout/custom-grid-layout";
import { DialogActions, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useBudget } from "./use-budget";
import { ThemeModeColor } from "@root/utils";
import { LoadingButton } from "@mui/lab";
import { CustomLoader } from "@components/loader";

export function Budget({ handleNext, viewDetailId }): JSX.Element {
    const {
        handleBudgetIncreaseChange,
        handleRaiseBudgetChange,
        budgetIncrease,
        raiseBudget,
        handleConfirm,
        promotionIncrease,
        handlePromotionIncreaseChange,
        updatedBudgetData,
        totalSpend,
        isLoading,
        isBudgetLoading
    } = useBudget({ viewDetailId, handleNext });
    return (
        <CustomCard
            cardProps={{
                sx: { minHeight: '65vh' }
            }}
            subHeader cardSubHeader={{
                title: 'Budget',
                description: "Set the budget, provide raise guidance to managers, and calculate projected spend for this comp cycle. Managers can choose to accept the raise guidance or use it to inform their own recommendations. At the end of the cycle, admins can review and approve the final amount. If there is any remaining budget, admins will have the opportunity to distribute it on the next page.",
                rootSxCardSubHeader: { fontSize: '20px', pb: '10px', color: ThemeModeColor('neutral.700', 'neutral.300') }
            }}>
            {isBudgetLoading && <CustomLoader />}
            <Divider sx={{ mt: '-24px', mb: '24px' }} />
            <CustomGridLayout
                title="Set the raise budget"
                description="Calculate the raise budget for the cycle by entering an average percent increase on total pay (including variable if applicable) for each eligible employee or entering a lump sum amount."
                rootTitleSx={{ fontSize: '16px', fontWeight: 600, pb: '5px' }}
            >
                <TableComponent
                    headers={['Eligible Employee Pay', 'Increase Per Employee', 'Raise Budget']}
                    field1={`£ ${updatedBudgetData?.eligibleEmployeePay}`}
                    field2={<TextField
                        variant="outlined"
                        name='budgetIncrease'
                        size='small'
                        type='number'
                        fullWidth
                        placeholder="0%"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={budgetIncrease}
                        onChange={handleBudgetIncreaseChange(updatedBudgetData?.eligibleEmployeePay)}
                    />}
                    field3={<TextField
                        variant="outlined"
                        name='raiseBudget'
                        size='small'
                        type='number'
                        fullWidth
                        placeholder="£ 0"
                        InputProps={{ inputProps: { min: 0 } }}
                        value={raiseBudget}
                        onChange={handleRaiseBudgetChange(updatedBudgetData?.eligibleEmployeePay)}
                    />}
                />
            </CustomGridLayout>
            <CustomGridLayout
                title="Promotion raise guidance"
                isOptional
                description="Provide recommenders with raise guidance by entering the target band attainment or raise percent for promoted employees in their new band."
                rootTitleSx={{ fontSize: '16px', fontWeight: 600, pb: '5px' }}
            >
                <TableComponent
                    headers={['Employee', 'Increase Per Employee', 'Total Spend']}
                    field1={updatedBudgetData?.employeePromotionCount}
                    field2={<TextField
                        variant="outlined"
                        name='increasePerEmployee'
                        size='small'
                        type='number'
                        value={promotionIncrease ?? 0}
                        onChange={handlePromotionIncreaseChange}
                        fullWidth
                        placeholder="0%"
                        InputProps={{ inputProps: { min: 0 } }}
                    />}
                    field3={`£ ${totalSpend ? totalSpend : 0}`}
                />
            </CustomGridLayout>
            <DialogActions sx={{ mt: 3 }}>
                <LoadingButton loading={isLoading} onClick={handleConfirm} variant='contained'>Continue</LoadingButton>
            </DialogActions>
        </CustomCard>
    )
}

function TableComponent({ headers, field1, field2, field3 }: any): JSX.Element {
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers?.map((header: string) => <TableCell key={header}>
                            <Typography variant='subtitle2' fontWeight={600} whiteSpace='nowrap' color='neutral.500' textTransform='capitalize'>{header}</Typography>
                        </TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ color: ThemeModeColor('neutral.800', 'neutral.300') }}>{field1}</TableCell>
                        <TableCell sx={{ color: ThemeModeColor('neutral.800', 'neutral.300') }}>{field2}</TableCell>
                        <TableCell sx={{ color: ThemeModeColor('neutral.800', 'neutral.300') }}>{field3}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}