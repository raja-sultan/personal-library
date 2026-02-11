import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import {
  FormProvider,
  RHFUploadSingleFileWithPreview,
  IsFetching,
} from "common";
import { useAddReferral } from "./use-add-referral";
import { LoadingButton } from "@mui/lab";

export function AddReferrals({ setShowAddReferrals }): JSX.Element {
  const { submitHandler, addReferralsFormData, methods, isSubmitting } =
    useAddReferral({
      setShowAddReferrals,
    });

  return (
    <Grid container>
      <Grid item xs={12}>
        <IsFetching isFetching={isSubmitting} />
        <FormProvider methods={methods} onSubmit={submitHandler}>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={6}>
              <Grid container p={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">Select a Job</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 400, mt: 1 }}>
                    Not sure which job? Pick the closest option and make sure to
                    leave a note for the hiring team!
                  </Typography>
                </Grid>
                {addReferralsFormData?.map((item: any) => {
                  const { component: Component, componentProps } = item;

                  return (
                    <Grid item xs={12} md={item?.md} key={item?.id} mt={1}>
                      {item?.heading && (
                        <Typography variant="h5" mt={2} mb={2}>
                          {item?.heading}
                        </Typography>
                      )}
                      <Component {...componentProps} />
                    </Grid>
                  );
                })}
                <Grid
                  item
                  xs={12}
                  mt={2}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={() => {
                      setShowAddReferrals(true);
                    }}
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    sx={{ ml: 2 }}
                    loading={isSubmitting}
                  >
                    Add this Referral
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <RHFUploadSingleFileWithPreview name="uploadFiles" />
            </Grid>
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  );
}
