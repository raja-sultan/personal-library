"use client";

import { Grid } from "@mui/material";
import { CreateReports } from "@sections/reports/field-reports/create-reports";

function CreateNewPage(): JSX.Element {
  return (
    <Grid
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        p: 3,
      }}
    >
      <Grid item xs={12}>
      <CreateReports />
      </Grid>
    </Grid>
  );
}

export default CreateNewPage;