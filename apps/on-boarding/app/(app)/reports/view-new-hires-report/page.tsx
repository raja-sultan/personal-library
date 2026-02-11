"use client";

import { Grid } from "@mui/material";
import { NewHireReport } from "@sections/reports/new-hire";
// import { ReportsSection } from "@sections/reports";

function ViewNewHiresReport(): JSX.Element {
  return (
    <Grid
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        p: 3,
      }}
    >
      <Grid item xs={12}>
        <NewHireReport />
      </Grid>
    </Grid>
  );
}

export default ViewNewHiresReport;