import React from "react";
import { ManagerTable } from "./manager-table";
import { CoordinatorTable } from "./coordinator-table";
import { DirectReportsTable } from "./reports-table";
import { Box, Grid } from "@mui/material";
import PersonalInfoCard from "./personal-info";

function ProfileTab({ data }: any): JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <ManagerTable data={data} />
        <Box sx={{ my: 3 }}>
          <CoordinatorTable data={data} />
        </Box>
        <DirectReportsTable data={data} />
      </Grid>
      <Grid item xs={12} md={4}>
        <PersonalInfoCard data={data} />
      </Grid>
    </Grid>
  );
}

export default ProfileTab;
