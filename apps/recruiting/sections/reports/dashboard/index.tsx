import React from "react";
import { Grid, Box } from "@mui/material";
import { CustomBreadCrumbs, CustomTabs } from "common";
import { PipelineHealth } from "./pipeline-health";
import OffersAndHealth from "./offers-and-health";
import { RecruitingEfficiency } from "./recruiting-efficiency";

export function ReportDashboard(): JSX.Element {
  const breadcrumbs = [
    { key: "1", value: "Home", link: "/dashboard" },
    { key: "2", value: "Reports", link: "/reports" },
    { key: "3", value: "Dashboard", link: "" },
  ];

  return (
    <Box sx={{ p: 2.5, a: { color: "text.primary" } }}>
      <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      <Grid container mt={2}>
        <Grid item xs={12} mt={1}>
          <CustomTabs
            tabsNameArray={["Offers & Hiring", "Recruiting", "Pipeline Health"]}
          >
            <OffersAndHealth />
            <RecruitingEfficiency />
            <PipelineHealth />
          </CustomTabs>
        </Grid>
      </Grid>
    </Box>
  );
}
