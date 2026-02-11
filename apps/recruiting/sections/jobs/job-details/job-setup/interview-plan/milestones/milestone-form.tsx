import { useForm } from "react-hook-form";
import { Box, Grid, Typography } from "@mui/material";
import { style } from "./milestone.styles";
import { FormProvider, RHFAutocompleteAsync } from "common";

import React, { useEffect } from "react";
import { useUpdateMileStonesMutation } from "@services/jobs/job-details/job-setup/interview-plan/interview-plan-api";

export function MileStoneForm({
  jobDetails,
  stagesList,
  jobId,
}: any): JSX.Element | null {
  const [updateMilesStones] = useUpdateMileStonesMutation();
  const defaultValues: any = {};

  jobDetails?.mileStones?.forEach(({ candidatesReach, mileStoneName }: any) => {
    defaultValues[mileStoneName] = candidatesReach;
  });

  const methods: any = useForm({
    defaultValues,
  });

  const { watch, getValues } = methods;

  useEffect(() => {
    const subscription = watch(async (value, { name }): Promise<void> => {
      await updateMilesStones({
        jobId,
        payload: {
          mileStoneName: name,
          candidatesReach: getValues(name),
        },
      });
    });
    return () => subscription.unsubscribe();
  }, [watch, getValues, updateMilesStones, jobId]);

  return (
    <FormProvider methods={methods}>
      <Typography
        variant="subtitle2"
        sx={{ p: 1, backgroundColor: "background.paper" }}
      >
        Milestones are a standardized way to think about interview pipelines
        across all of your jobs. No matter how different individual pipelines
        are, you can use milestones to run meaningful pipeline reports.
      </Typography>
      <Grid container sx={{ flexWrap: "nowrap" }}>
        <Grid item xs={4}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Milestone
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Candidates That Reach
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Action
          </Typography>
        </Grid>
      </Grid>
      {jobDetails?.mileStones?.map((item: any) => (
        <Grid
          container
          // spacing={}
          columnGap={0.4}
          key={item?.id}
          sx={{ flexWrap: "nowrap", minWidth: "70%", overflowX: "auto" }}
        >
          <Grid item xs={12} md={4} sx={style.tableData}>
            <Typography variant="body2" component="h6">
              {item?.mileStoneName}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={style.tableData}>
            <Box sx={{ width: "100%" }}>
              {item?.mileStoneName !== "Offer" &&
              item?.mileStoneName !== "Hired" ? (
                <RHFAutocompleteAsync
                  fullWidth
                  multiple
                  limitTags={1}
                  // key={fields?.[index]?.id}
                  name={item.mileStoneName}
                  apiQuery={stagesList}
                  externalParams={{ jobId }}
                  getOptionLabel={(option: any) => option.stageName}
                />
              ) : (
                item?.mileStoneName
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={style.tableData}>
            <Typography variant="body2" component="h6">
              {item.action}
            </Typography>
          </Grid>
        </Grid>
      ))}
      {!jobDetails?.mileStones && (
        <Grid item xs={12} sx={style.tableData}>
          <Typography variant="body2" component="h6">
            No Items
          </Typography>
        </Grid>
      )}
    </FormProvider>
  );
}
