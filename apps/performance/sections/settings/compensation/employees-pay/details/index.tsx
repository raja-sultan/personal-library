"use client";

import CustomCard from "@components/custom-card";
import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import { FormProvider, RHFDatePicker, RHFTextField } from "common";
import usePayDetails from "./use-pay-details";

export function PayDetails(): JSX.Element {
  const { router, methods, handleUpdatePay, handleSubmit } = usePayDetails();

  return (
    <CustomCard
      header
      cardProps={{ sx: { minHeight: "calc(100vh - 230px)" } }}
      cardHeader={{
        title: "Employee Pay Details",
        onBack: () => {
          router.push("/settings/compensation/employees-pay");
        },
        divider: true,
      }}
    >
      <Grid container>
        <Grid item xl={4} lg={6} sm={12} xs={12}>
          <Typography fontWeight={600} variant="body2">
            Pay Information
          </Typography>
          <Typography fontWeight={400} variant="subtitle2" color="text.secondary">
            Fill in Employee Pay Information
          </Typography>
        </Grid>
        <Grid item xl={4} lg={6} sm={12} xs={12}>
          <FormProvider methods={methods} onSubmit={handleSubmit(handleUpdatePay)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <RHFTextField select placeholder="Select" name="payType" outerLabel="Pay type">
                  <MenuItem value="Salary">Salary</MenuItem>
                  <MenuItem value="Hourly">Hourly</MenuItem>
                </RHFTextField>
              </Grid>
              <Grid item xs={12}>
                <RHFTextField select placeholder="Select" name="currency" outerLabel="Currency">
                  <MenuItem value="USD $">USD</MenuItem>
                  <MenuItem value="AUD $">AUD</MenuItem>
                  <MenuItem value="GBP £">GBP</MenuItem>
                </RHFTextField>
              </Grid>
              <Grid item xs={12}>
                <RHFDatePicker name="payEffectiveDate" outerLabel="Pay Effective Date" />
              </Grid>
              <Grid item md={6} xs={12}>
                <RHFTextField
                  name="basePay"
                  type="number"
                  outerLabel="Base Pay"
                  InputProps={{
                    startAdornment: (
                      <Typography mr={1.5} fontSize={14} fontWeight={500}>
                        £
                      </Typography>
                    ),
                  }}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <RHFTextField
                  name="variablePay"
                  type="number"
                  outerLabel="Variable Pay (optional)"
                  InputProps={{
                    startAdornment: (
                      <Typography mr={1.5} fontSize={14} fontWeight={500}>
                        £
                      </Typography>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem", mt: 4 }}>
              <Button
                type="button"
                variant="outlined"
                color="inherit"
                onClick={() => {
                  router.push("/settings/compensation/employees-pay");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </FormProvider>
        </Grid>
      </Grid>
    </CustomCard>
  );
}
