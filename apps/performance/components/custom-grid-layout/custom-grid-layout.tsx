import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import type { SxProps } from "@mui/material";
import { ThemeModeColor } from "@root/utils";

interface Props {
  title?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
  hideDivider?: boolean;
  childrenSx?: SxProps;
  childrenBreakPoints?: { xl?: number; lg?: number; md?: number; xs?: number };
  rootTitleSx?: SxProps;
  isOptional?: boolean;
}

export function CustomGridLayout({ rootTitleSx, isOptional, title, description, children, hideDivider, childrenSx, childrenBreakPoints = { md: 7.5, xs: 12 } }: Props): JSX.Element {
  const optionalTag = isOptional && <span style={{ opacity: 0.7, fontWeight: 400 }}>(Optional)</span>;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={4.5} xs={12}>
          <Typography fontWeight={500} variant="body1" color={ThemeModeColor("neutral.900")} sx={rootTitleSx}>
            {title} {optionalTag}
          </Typography>
          <Typography variant="subtitle2" fontWeight={400} color={ThemeModeColor("neutral.500", "neutral.400")}>
            {description}
          </Typography>
        </Grid>
        <Grid item {...childrenBreakPoints} sx={childrenSx}>
          {children}
        </Grid>
      </Grid>
      {!hideDivider && <Divider sx={{ my: "16px" }} />}
    </>
  );
}
