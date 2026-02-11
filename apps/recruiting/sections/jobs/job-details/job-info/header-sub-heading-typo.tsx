import { Typography } from "@mui/material";
import React from "react";

export function HeaderSubHeadingTypo({ header, subtitle }) {
  return (
    <>
      <Typography variant="subtitle2">{header}</Typography>
      <Typography variant="subtitle1">{subtitle}</Typography>
    </>
  );
}
