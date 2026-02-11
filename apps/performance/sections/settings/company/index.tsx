'use client';

import React from "react";
import { Card, Box, Typography, Grid, MenuItem, Button } from "@mui/material";
import { FormProvider } from "common";
import { companyFormData } from "./company-profile.data";
import { CompanyLocation } from "./company-location";
import type { componentProps } from "./company-profile.types";
import { useCompany } from "./use-company";
import { PERMISSIONS } from "@enums/permissions";
import { PermissionProtected } from "@guards/permission-protected";



export function CompanySection(): JSX.Element {
    const { isLoading, handleSubmit, onSubmit, methods } = useCompany();
    const { PERMISSION } = PERMISSIONS.PERFORMANCE.SETTING.COMPANY.COMPANY;
    return (
        <Card sx={{ p: 3, minHeight: 'calc(100vh - 240px)' }}>
            <Box mb={5}>
                <Typography fontWeight={600} variant="h5" component='h5'>Company</Typography>
                <Typography fontWeight={400} variant="subtitle2" color="text.secondary">Update your company logo and details.</Typography>
            </Box>
            <Grid container spacing={5}>
                <Grid item xl={4} lg={6} sm={12} xs={12}>
                    <Typography fontWeight={600} variant="h6" component="h6">Company Details</Typography>
                    <Typography fontWeight={400} variant="subtitle2" color="text.secondary">{`In the company details, you should include basic information such as the company name, location, , mission, number of employees, and any relevant details about the company's values.`}</Typography>
                </Grid>
                <Grid item xl={4} lg={6} sm={12} xs={12}>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing="20px">
                            {companyFormData.map(({ id, helperText, Component, componentProps, options, companyLocation }: componentProps) => (
                                <Grid item xs={12} key={id}>
                                    <PermissionProtected permission={PERMISSION.EDIT_PROFILE}>
                                    {componentProps ?
                                        <Component fullWidth {...componentProps}> 
                                            {componentProps?.select
                                                ? options?.map((option: { value?: string; label?: string }) => (
                                                    <MenuItem value={option.value} key={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))
                                                : null}
                                        </Component>
                                        : companyLocation && <CompanyLocation />
                                    }
                                    </PermissionProtected>
                                    {helperText && <Box width="100%">
                                        <Typography variant="caption" ml={4}>{helperText}</Typography>
                                    </Box>}
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem", mt: 4 }}>
                            {/* <Button
                                type="button"
                                variant="outlined"
                                onClick={() => {
                                    router.push("/settings/employees");
                                }}
                            >
                                Cancel
                            </Button> */}
                             <PermissionProtected permission={PERMISSION.EDIT_PROFILE}>
                            <Button type="submit" variant="contained">
                                {isLoading ? "Loading..." : "Save Changes"}
                            </Button>
                            </PermissionProtected>
                             
                        </Box>
                    </FormProvider>
                </Grid>
            </Grid>
        </Card>
    )
}