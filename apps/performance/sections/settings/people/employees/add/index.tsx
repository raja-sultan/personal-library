"use client";
import React from "react";
import { LoadingButton } from "@mui/lab";
import CustomCard from "@components/custom-card";
import { Typography, Box, Grid, Divider, Button, Stack } from "@mui/material";
import { RHFDatePicker, RHFTextField, RHFSelect, FormProvider, RHFPhoneField } from "common";
import { styles } from "./add-employee.styles";
import useAddEmployee from "./use-add-employee";

export function AddEmployeeComp(): JSX.Element {
  const {
    departments,
    companyLocations,
    mutationLoading,
    onSubmit,
    methods,
    handleSubmit,
    router,
  } = useAddEmployee();

  console.log(companyLocations)

  return (
    <CustomCard
      header
      cardHeader={{
        title: "Add Employee",
        divider: true,
        onBack: () => {
          router.push("/settings/employees");
        },
      }}
    >
      <Box mt="25px">
        <FormProvider methods={{ ...methods }} onSubmit={handleSubmit(onSubmit)}>
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <Typography sx={styles.textHead}>Personal Information</Typography>
                <Typography variant="body2" mt="16px" sx={styles.subText}>
                  Update the details that will be visible on Employee`s profile.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={2.91}>
                <Stack spacing={3}>
                  <RHFTextField name="firstName" outerLabel="First Name" placeholder="First Name" />
                  <RHFTextField name="lastName" outerLabel="Last Name" placeholder="Last Name" />
                  <RHFTextField
                    placeholder="Personal Email"
                    name="email"
                    outerLabel="Personal Email"
                  />
                  <RHFPhoneField
                    name="phoneNumber"
                    outerLabel="Phone Number (Optional)"
                    defaultCountry="gb"
                  />
                  <RHFSelect
                    size="medium"
                    placeholder="Select"
                    name="gender"
                    outerLabel="Gender (Optional)"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </RHFSelect>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6} lg={4} />
            </Grid>
            <Divider sx={styles.divider} />
          </>
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={4}>
                <Typography sx={styles.textHead}>Work Information</Typography>
                <Typography variant="body2" mt="16px" sx={styles.subText}>
                  Add your work information.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xl={2.91}>
                <Stack spacing={3}>
                  <RHFTextField
                    name="employeeId"
                    outerLabel="Employee ID (Optional)"
                    placeholder="ID"
                  />
                  <RHFTextField name="workEmail" outerLabel="Work Email" placeholder="Email" />
                  <RHFDatePicker name="employmentStartDate" outerLabel="Start Date (Optional)" />
                  <RHFTextField name="title" outerLabel="Title (Optional)" />
                  <RHFSelect name="department" outerLabel="Department (Optional)">
                    {departments?.data?.departments?.map((dept) => {
                      return (
                        <option key={dept._id} value={dept._id}>
                          {dept.departmentName}
                        </option>
                      );
                    })}
                  </RHFSelect>
                  <RHFSelect select name="location" outerLabel="Location (Optional)">
                    {companyLocations?.data?.map((location) => {
                      return (
                        <option key={location._id} value={location._id}>
                          {location.address}
                        </option>
                      );
                    })}
                  </RHFSelect>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6} lg={4} />
            </Grid>
            {/* <Divider sx={styles.divider} /> */}
          </>
          <Box sx={styles.btnContainerBox}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                router.push("/settings/employees");
              }}
            >
              Cancel
            </Button>
            <LoadingButton loading={mutationLoading} type="submit" variant="contained">
              Save
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </CustomCard>
  );
}
