"use client";

import { Grid } from "@mui/material";
import { PendingHireReport } from "@sections/reports/pending-hires-reports";
// import { ReportsSection } from "@sections/reports";

function ViewReportPendingHires(): JSX.Element {
  return (
    <Grid
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        p: 3,
      }}
    >
      <Grid item xs={12}>
        <PendingHireReport />
      </Grid>
    </Grid>
  );
}

export default ViewReportPendingHires;