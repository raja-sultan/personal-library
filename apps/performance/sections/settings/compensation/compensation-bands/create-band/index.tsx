"use client";

import CustomCard from "@components/custom-card";
import { FormProvider } from "common";
import React, { Fragment } from "react";
import useCreateBand from "./use-create-band";
import { Box, Button, DialogActions, Divider, Grid, MenuItem, Typography } from "@mui/material";
import { FormData } from "./data";

export function CreateBand(): JSX.Element {
  const { methods, onBack, onSubmit, handleSubmit } = useCreateBand();

  return (
    <CustomCard header cardHeader={{ title: "Compensation Band", onBack, divider: true }}>
      <Box mt="25px">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {FormData()?.map((item: any) => {
            return (
              <Fragment key={item?.id}>
                <Grid key={item?.id} container spacing={2}>
                  <Grid item xs={12} md={6} lg={4}>
                    <Typography fontWeight={600} variant="subtitle1" color="neutral.900">
                      {item?.header?.title}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight={400} color="neutral.500">
                      {item?.header?.desc}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
                    <Grid container spacing={2}>
                      {item?.formFields?.map((field: any) => (
                        <Grid item xs={12} key={field.id}>
                          <field.component {...field.componentProps}>
                            {field?.componentProps?.select
                              ? field?.options?.map((option: { value: string; label: string }) => (
                                <MenuItem key={option?.value} value={option?.value}>
                                  {option?.label}
                                </MenuItem>
                              ))
                              : null}
                          </field.component>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
                {item?.divider && <Divider sx={{ my: "24px" }} />}
              </Fragment>
            );
          })}
          <DialogActions sx={{ gap: "16px", mt: "24px" }}>
            <Button variant="outlined" onClick={onBack}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </Box>
    </CustomCard>
  );
}
