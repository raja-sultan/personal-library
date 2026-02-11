import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { FieldReports } from "./field-reports";
import { ViewReportButton } from "./view-report-button";

export function ReportsSection(): JSX.Element {
  // Api Call Here
  return (
    <Paper sx={{ p: 2.5 }}>
      <Typography gutterBottom variant="h5" sx={{ mb: 2 }}>
        Reports
      </Typography>
      <FieldReports />
      <Box sx={{ mt: 2 }}>
        <ViewReportButton />
      </Box>
    </Paper>
  );
}
