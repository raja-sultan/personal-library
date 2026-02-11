import { Grid, Typography } from "@mui/material";
import React from "react";
import { fieldsInfo } from "./follow-up-email-form-data";
import { GenFormField } from "@components/form-fields-generator";

export function FollowUpAndResume({ isDisabled }): JSX.Element {
  return (
    <Grid container item sm={12} md={6}>
      <Typography variant="body2" sx={{ fontWeight: "bold", p: "0.5em" }}>
        Auto-send Follow Up Email
      </Typography>
      {/* Dynamically Generated Fields  */}
      {fieldsInfo.map((item: any, index: number) => {
        const props = item?.OuterConProps ? item?.OuterConProps : {};
        return (
          <GenFormField
            key={index}
            item={item}
            isSubmitting={false}
            disabled={isDisabled}
            {...props}
          />
        );
      })}
    </Grid>
  );
}
