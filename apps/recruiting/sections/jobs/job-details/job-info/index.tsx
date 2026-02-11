import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { JobInfoDetailsSec } from "./job-info-details-sec";
import { JobOpeningTable } from "./job-opening-table/job-opening-table";
import { useJobInfoDetails } from "./use-job-info-details";
import MainJobDetailSkeleton from "@sections/jobs/stepper-form-skeleton";
import { Error, IsFetching } from "common";
import { ManageOpeningModal } from "./manage-opening-model/manage-opening-modal";
import { JobDetailsHeader } from "../job-details-header";

export function JobInfoDetails(): React.JSX.Element {
  const {
    isLoading,
    isFetching,
    isError,
    jobTemplateHan,
    jobInfoDetailCon,
    jobInfo,
    veiwAndManageInfoCon,
    viewManageModelToggle,
  } = useJobInfoDetails();

  if (isLoading) return <MainJobDetailSkeleton />;
  if (isError) return <Error statusCode={500} title="Will Update You Later" />;

  return (
    <Box>
      <JobDetailsHeader mainTitle="Job Info" />
      <Grid container sx={{ position: "relative" }}>
        <IsFetching isFetching={isFetching} />
        <Grid item lg={12} container>
          <Grid item sm={12} sx={{ mt: 2 }}>
            <Box display="flex">
              <Switch
                checked={jobInfoDetailCon.isTemplate}
                onClick={jobTemplateHan}
              />
              <Typography variant="body1" sx={{ ml: 1 }}>
                Template Job
              </Typography>
            </Box>
          </Grid>
          <JobInfoDetailsSec jobInfo={jobInfo} />
          <Grid item sm={12} container sx={{ m: "0.4em" }}>
            <Grid item sm={12} container>
              <Grid item sm={6} container alignItems="center">
                <Typography variant="subtitle1">Job Status</Typography>
              </Grid>
              <Grid
                item
                sm={6}
                sx={{ p: 1 }}
                container
                justifyContent="flex-end"
              >
                <Button variant="outlined" sx={{ ml: "1.1em" }}>
                  View Report
                </Button>
                <Button
                  variant="contained"
                  sx={{ ml: "1.1em" }}
                  onClick={viewManageModelToggle}
                >
                  Manage Openings
                </Button>
              </Grid>
            </Grid>
            <Grid item sm={12}>
              <JobOpeningTable />
            </Grid>
            <Grid item sm={12}>
              <ManageOpeningModal
                isOpen={veiwAndManageInfoCon?.manageOpeningModal}
                closeModel={viewManageModelToggle}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
