"use client";

import { Grid } from "@mui/material";
import { ESignatureReport } from "@sections/reports/e-signature-report";

function ViewESignatureReport(): JSX.Element {
  return (
    <Grid
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        p: 3,
      }}
    >
      <Grid item xs={12}>
      <ESignatureReport />
      </Grid>
    </Grid>
  );
}

export default ViewESignatureReport;