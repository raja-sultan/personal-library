'use client'
import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { GoalsOverviewData } from "./goals-overview.data";
import { styles } from "./goals-overview.styles";
import { DashboardCard } from "@components/dashboard/dashboard-card";


export function GoalsOverview(): JSX.Element {
  return (
    <DashboardCard>
      <Box sx={styles.mainBoxWrapper}>
        <Typography color="text.primary" sx={styles.textStyle}>Goals Overview</Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} xl={12}>
            <Box sx={styles.chartBoxWrapper}>
              <GoalsOverviewData />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </DashboardCard>
  );
};  
