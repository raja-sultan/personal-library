"use client";

import { Grid } from "@mui/material";
import { ViewTaskReport } from "@sections/reports/view-task-report";

function TaskReport(): JSX.Element {
  return (
    <Grid
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        p: 3,
      }}
    >
      <Grid item xs={12}>
      <ViewTaskReport />
      </Grid>
    </Grid>
  );
}

export default TaskReport;