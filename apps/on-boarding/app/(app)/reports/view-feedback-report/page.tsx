"use client";

import { Grid } from "@mui/material";
import { ViewFeedbackReportSection } from "@sections/reports/view-feedback-report";

function ViewFeedbackReport(): JSX.Element {
  return (
    <Grid
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        p: 3,
      }}
    >
      <Grid item xs={12}>
        <ViewFeedbackReportSection/>
      </Grid>
    </Grid>
  );
}

export default ViewFeedbackReport;