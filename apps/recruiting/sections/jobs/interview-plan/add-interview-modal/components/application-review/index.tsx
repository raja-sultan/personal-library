import { Grid } from "@mui/material";
import { RHFTextField } from "common";
import React from "react";

export function ApplicationReview(): JSX.Element {
  return (
    <Grid item xs={12}>
      <RHFTextField
        placeholder=""
        outerLabel="Interview Name"
        name="interviewName"
        type="text"
        fullWidth
      />
      <RHFTextField
        placeholder="Add Description"
        outerLabel="Description"
        name="description"
        type="text"
        multiline
        fullWidth
        rows={6}
      />
    </Grid>
  );
}
