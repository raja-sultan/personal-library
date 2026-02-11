"use client";

import { Box, Grid, Typography } from "@mui/material";
import { CompanyIntroSection } from "@sections/home";
import { DashboardTableSection } from "@sections/home/dashboard-table";
import { JobsPostedSection } from "@sections/home/jobs-posted";
import { MyTaskSection } from "@sections/home/my-tasks";
import { NewHiresSection } from "@sections/home/new-hires";
import { OnBoardingStatsSection } from "@sections/home/on-boarding-stats";
import { PendingHiresSection } from "@sections/home/pending-hires";
import { ProgressSection } from "@sections/home/progress";

function Dashboard(): JSX.Element {
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 2, fontWeight: 600 }}
        color="text.primary"
      >
        Welcome back, Robert
      </Typography>

      {/* <CompanyIntroSection /> */}
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <CompanyIntroSection />
          <JobsPostedSection />
        </Grid>
        <Grid item xs={6}>
          <OnBoardingStatsSection />
        </Grid>
        <Grid container item xs={4} columnSpacing={2}>
          <Grid item xs={6}>
            <NewHiresSection />
          </Grid>
          <Grid item xs={6}>
            <PendingHiresSection />
          </Grid>
          <Grid item xs={12}>
            <MyTaskSection />
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <DashboardTableSection />
        </Grid>
        <Grid item xs={4}>
          <ProgressSection />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
