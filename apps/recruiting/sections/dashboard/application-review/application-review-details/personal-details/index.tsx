import { Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";

export function PersonalDetailSection({ candidateData }): React.JSX.Element {
  return (
    <>
      <Typography variant="body1" fontWeight={600} sx={{ mb: 2 }}>
        Personal Details
      </Typography>
      <Grid container>
        <Grid item xs={12} md={2} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            First Name
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            {candidateData?.nameAndCompany?.firstName ?? "---"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Last Name
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            {candidateData?.nameAndCompany?.lastName ?? "---"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Applied Date
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            {dayjs(candidateData?.createdAt).format("MM/DD/YYYY") ?? "---"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Designation
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            {candidateData?.nameAndCompany?.currentTitle ?? "---"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Department
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            {candidateData?.department?.departmentName ?? "---"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Current Salary
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            {candidateData?.currentSalary ?? "---"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Expected Salary
          </Typography>
          <Typography variant="subtitle2" fontWeight={400}>
            {candidateData?.expectedSalary ?? "---"}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
