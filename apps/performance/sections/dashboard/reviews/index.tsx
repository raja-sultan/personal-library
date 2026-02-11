"use client";
import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReviewsData } from "./reviews.data";
import { styles } from "./reviews.styles";
import { DashboardCard } from "@components/dashboard/dashboard-card";

export function Reviews(): JSX.Element {
  return (
    <DashboardCard>
      <Box sx={styles.main}>
        <Typography color="text.primary" sx={styles.title}>Reviews</Typography>
        <ReviewsData />
      </Box>
    </DashboardCard>
  );
}
