import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { style } from "../milestones/milestone.styles";
import { useGetFormByStageListQuery } from "@services/jobs/job-details/job-setup/interview-plan/interview-plan-api";
import { useSearchParams } from "next/navigation";

export function FormByStage(): JSX.Element | null {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data } = useGetFormByStageListQuery({ jobId });

  return (
    <>
      <Grid container sx={{ flexWrap: "nowrap" }}>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Milestone
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Form
          </Typography>
        </Grid>
      </Grid>
      {data?.data?.map((stage) => (
        <Grid
          key={stage?._id}
          container
          columnGap={0.4}
          sx={{ flexWrap: "nowrap", minWidth: "70%", overflowX: "auto" }}
        >
          <Grid item xs={12} md={6} sx={style.tableData}>
            <Typography variant="body2" component="h6">
              {stage?._id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={style.tableData}>
            <Box sx={{ width: "100%" }}>
              {stage?.count ? stage?.count : "--"}
            </Box>
          </Grid>
        </Grid>
      ))}
      {data?.data.length === 0 && (
        <Grid item xs={12} sx={style.tableData}>
          <Typography variant="body2" component="h6">
            No Items
          </Typography>
        </Grid>
      )}
    </> 
  );
}
