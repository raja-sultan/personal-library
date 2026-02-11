"use client";
import { FormProvider, RHFTextField } from "common";
import React, { Fragment } from "react";
import CustomCard from "@components/custom-card";
import { Typography, Box, Grid, Divider, MenuItem, Button, InputAdornment, } from "@mui/material";
import { useAddKeyResult } from "./use-add-key-result";
import { useAddKeyResultFormData } from "./add-key-result.data";
import { KeyTypeIcon } from "@assets/icons/key-type-icon";
import { LoadingButton } from "@mui/lab";
import { CustomLoader } from "@components/loader";

export default function AddKeyResult(): React.JSX.Element {

  const { methods, router, handleSubmit, onSubmit, isLoading, isGetKeyLoading, actionType,goalId } = useAddKeyResult();
  const data = useAddKeyResultFormData();
  const watchValue = methods.watch('type')

  const typeNumberComponent = [
    {
      id: "1",
      componentProps: {
        name: "start",
        outerLabel: "Start",
        placeholder: "0"
      },
      component: RHFTextField,
      xl: 6,
      lg: 6,
      md: 6,
      xs: 12,

    },
    {
      id: "2",
      componentProps: {
        name: "target",
        outerLabel: "Target",
        placeholder: "0"
      },
      component: RHFTextField,
      xl: 6,
      lg: 6,
      md: 6,
      xs: 12,

    }
  ];

  const typeCurrencyComponent = [
    {
      id: "1",
      componentProps: {
        name: "start",
        outerLabel: "Start",
        placeholder: "£0.00"
      },
      component: RHFTextField,
      xl: 6,
      lg: 6,
      md: 6,
      xs: 12,

    },
    {
      id: "2",
      componentProps: {
        name: "target",
        outerLabel: "Target",
        placeholder: "£0.00"
      },
      component: RHFTextField,
      xl: 6,
      lg: 6,
      md: 6,
      xs: 12,

    }
  ];

  const typePercentageComponent = [
    {
      id: "1",
      componentProps: {
        name: "start",
        outerLabel: "Start",
        placeholder: "0.00%"
      },
      component: RHFTextField,
      xl: 6,
      lg: 6,
      md: 6,
      xs: 12,

    },
    {
      id: "2",
      componentProps: {
        name: "target",
        outerLabel: "Target",
        placeholder: "0.00%"
      },
      component: RHFTextField,
      xl: 6,
      lg: 6,
      md: 6,
      xs: 12,

    }
  ];

  const title = actionType && actionType?.charAt(0).toUpperCase() + actionType?.slice(1)

  return (
    <CustomCard
      header
      cardHeader={{
        title: `${title} Key Result`,
        divider: true,
        onBack: () => {
          router.back();
        },
      }}
    >
      {isGetKeyLoading && <CustomLoader />}
      <Box mt="24px">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {data?.map(({ divider, fields, head, id, subText }) => (
            <Fragment key={id}>
              <Grid container spacing={2} columnGap={3}>
                <Grid item xs={12} md={4} lg={4.5} xl={4} sm={12}>
                  <Typography variant="subtitle1" fontWeight={600} color='text.primary'>
                    {head}
                  </Typography>
                  <Typography mt={0.4} variant="subtitle2" fontWeight={400} color='text.secondary'>
                    {subText}
                  </Typography>
                </Grid>
                <Grid item xl={4.5} lg={6} md={6} xs={12} sm={12} sx={{ width: '100%' }}>
                  <Grid container spacing={2}>
                    {fields?.map((field) => (
                      <Grid item lg={field?.lg} md={field?.md} xs={field?.xs} key={field?.id} sx={{ width: '100%' }}>
                        <field.component size="small" fullWidth sx={{ mb: "20px" }} {...field?.componentProps}>
                          {field?.componentProps?.select
                            ? field?.options?.map((option: { value?: string; label?: string }) => (
                              <MenuItem value={option?.value} key={option?.value}>
                                {option?.label}
                              </MenuItem>
                            ))
                            : null}
                        </field.component>

                        {watchValue === 'Number' && field?.componentProps?.name === 'type' &&
                          <Grid container spacing={2}>
                            {typeNumberComponent?.map((numberField) => (
                              <Grid item lg={numberField?.lg} md={numberField?.md} xs={numberField?.xs} key={numberField?.id} sx={{ width: '100%' }}>
                                <numberField.component size="small" type='number' fullWidth sx={{ mb: "20px" }} {...numberField?.componentProps}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <KeyTypeIcon />
                                      </InputAdornment>
                                    ),
                                  }} />
                              </Grid>
                            ))
                            }
                          </Grid>
                        }
                        {watchValue === 'Currency' && field.componentProps.name === 'type' &&
                          <Grid container spacing={2}>
                            {typeCurrencyComponent?.map((currencyField) => (
                              <Grid item lg={currencyField?.lg} md={currencyField?.md} xs={currencyField?.xs} key={currencyField?.id} sx={{ width: '100%' }}>
                                <currencyField.component size="small" fullWidth sx={{ mb: "20px" }} {...currencyField?.componentProps}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <KeyTypeIcon />
                                      </InputAdornment>
                                    ),
                                  }} />
                              </Grid>
                            ))
                            }
                          </Grid>
                        }

                        {watchValue === 'Percentage' && field?.componentProps?.name === 'type' &&
                          <Grid container spacing={2}>
                            {typePercentageComponent?.map((percentageField) => (
                              <Grid item lg={percentageField?.lg} md={percentageField?.md} xs={percentageField?.xs} key={percentageField?.id} sx={{ width: '100%' }}>
                                <percentageField.component size="small" fullWidth sx={{ mb: "20px" }} {...percentageField?.componentProps}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <KeyTypeIcon />
                                      </InputAdornment>
                                    ),
                                  }} />
                              </Grid>
                            ))
                            }
                          </Grid>
                        }
                      </Grid>
                    ))}

                  </Grid>
                </Grid>
              </Grid>
              {divider && <Divider sx={{ my: 3 }} />}
            </Fragment>
          ))}
          <Box mt={1.5} pb={2} sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                // router.push('/goals/create-goal/goal-details');
                router.push(`/goals/view-details?goalId=${goalId}`);
              }}
            >
              Cancel
            </Button>
            <LoadingButton loading={isLoading} type="submit" variant="contained">
              Save
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </CustomCard>
  );
}


