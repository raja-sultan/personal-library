"use client";

import { Grid } from "@mui/material";
// import { NewHireReport } from "@sections/reports/new-hire";
import { ViewNewHireChange } from "@sections/reports/new-hire-change";

function ViewNewHireChanges(): JSX.Element {
  return (
    <Grid
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        p: 3,
      }}
    >
      <Grid item xs={12}>
      <ViewNewHireChange/>
      </Grid>
    </Grid>
  );
}

export default ViewNewHireChanges;