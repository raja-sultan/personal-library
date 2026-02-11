"use client";
import { FormProvider, RHFAutocompleteSync, RHFTextField } from "common";
import { CustomGridLayout } from "@components/custom-grid-layout/custom-grid-layout";
import CustomCard from "@components/custom-card";
import { Button, DialogActions } from "@mui/material";
import { useSetup } from "./use-setup";
import { LoadingButton } from "@mui/lab";
import { CustomLoader } from "@components/loader";

export function SetUp({ handleNext, viewDetailId }): JSX.Element {

    const { methods, handleSubmit, onSubmit, employeesList, isLoading, isSingleCycleLoading } = useSetup({ handleNext, viewDetailId });

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {isSingleCycleLoading && <CustomLoader />}
            <CustomCard cardProps={{
                sx: { minHeight: '65vh', }
            }}>
                <CustomGridLayout
                    title="Cycle Name"
                    description="Something that’s clear and easily recognizable"
                    childrenBreakPoints={{ md: 5, xs: 12 }}
                >
                    <RHFTextField
                        name='name'
                        size='small'
                        placeholder='Enter Name'
                    />
                </CustomGridLayout>
                <CustomGridLayout title="Compensation cycle admins"
                    description="Cycle admins will have the ability to configure, launch, and manage this comp cycle. They'll also have permissions to view and override all comp adjustments. You may or add remove cycle admins at any time. Admins and custom roles are automatically granted these permissions for all comp cycles."
                    childrenBreakPoints={{ md: 5, xs: 12 }}
                >
                    <RHFAutocompleteSync
                        multiple
                        size='small'
                        name="adminIds"
                        outerLabel="Cycle Admins"
                        placeholder="Select"
                        options={employeesList}
                    />
                </CustomGridLayout>
                <DialogActions sx={{ mt: '240px' }}>
                    <LoadingButton loading={isLoading} type="submit" variant='contained'>Continue</LoadingButton>
                </DialogActions>
            </CustomCard>
        </FormProvider>
    );
}