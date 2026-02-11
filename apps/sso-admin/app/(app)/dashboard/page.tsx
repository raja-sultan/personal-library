"use client";

import { Grid, Typography } from "@mui/material";

import {
  ScheduleSection,
  StatCardsSection,
  AuditTrailSection,
  ChatHistorySection,
  ConnectAndServerSpaceChartSection,
  ProductSalesChartSection,
} from "@sections/dashboard";

function Dashboard(): JSX.Element {
  return (
    <Grid
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        p: 3,
        rowGap: 3,
      }}
      justifyContent="center"
      flexDirection="column"
      container
    >
      <Grid item>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>
      <Grid item container spacing={4}>
        <Grid item xl={8} lg={7} md={12} xs={12}>
          <StatCardsSection />
        </Grid>
        <Grid item xl={4} lg={5} sm={12}>
          <ConnectAndServerSpaceChartSection />
        </Grid>
      </Grid>
      <Grid item container spacing={4}>
        <Grid item xl={7} lg={6} xs={12}>
          <ScheduleSection />
        </Grid>
        <Grid item xl={5} lg={6} xs={12} sm={12}>
          <ProductSalesChartSection />
        </Grid>
      </Grid>
      <Grid item container spacing={4}>
        <Grid item md={6} xs={12}>
          <AuditTrailSection />
        </Grid>
        <Grid item md={6} xs={12}>
          <ChatHistorySection />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
