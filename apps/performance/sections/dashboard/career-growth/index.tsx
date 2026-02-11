"use client";
import React from "react";
import { Box, Typography, useTheme, } from "@mui/material";
import { CareerGrowthArrowUpIcon } from "@assets/icons/career-growth-arrow-up-icon";
import { CareerGrowthIcon } from "@assets/icons/career-growth-icon";
import { DashboardCard } from "@components/dashboard/dashboard-card";
import { CustomChip } from "common";
import { carerGrowth } from "./career-growth.styles";
import { useGetDashboardAnalyticsQuery } from "@services/dashboard/dashboard-api";
import { ComponentLoader } from "@components/component-loader";

export function CareerGrowth(): JSX.Element {
  const styles = carerGrowth()
  const theme = useTheme()

  const { data: careerGrowth, isLoading } = useGetDashboardAnalyticsQuery({});
  const dashboardGrowthArea = careerGrowth?.data?.careerGrowth?.averagePercentage.toFixed(2);

  return (
    <DashboardCard>
      {isLoading ? <ComponentLoader height='20vh' /> :
        <Box mb={0.2} sx={styles.carerGrowthWrapper}>
          <Box sx={styles.main}>
            <Box sx={styles.iconStyleWrap}>
              <CareerGrowthIcon sx={{ color: theme.palette.primary.main }} />
            </Box>
            <Typography color="text.primary" sx={styles.title}>Career Growth</Typography>
          </Box>
          <Typography m={0.46} variant="h4" color="text.primary" sx={styles.percentage}>
            {dashboardGrowthArea}%
          </Typography>
          <Box sx={styles.contentBox}>
            <Typography sx={styles.description}>Users with growth areas</Typography>
            <CustomChip variant="success" ChipProps={{
              icon: <CareerGrowthArrowUpIcon sx={styles.chipIconStyle} />,
              label: `${dashboardGrowthArea}%`
            }} />
          </Box>
        </Box>
      }
    </DashboardCard>
  );
}
