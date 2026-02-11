"use client";
import React from "react";
import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { MyOneOnOnes } from "./my-one-on-ones";
import { TaskToComplete } from "./task-to-complete";
import { CompanyProfile } from "./company-profile";
import { CareerGrowth } from "./career-growth";
import { Reviews } from "./reviews";
import { GoalsOverview } from "./goals-overview";
import { styles } from "./dashboard.styles";
import { useGetProfileQuery } from "@services/profile/profile-api";

export function Dashboard(): JSX.Element {

  const { data, isLoading } = useGetProfileQuery({});

  const userName = `${data?.data?.firstName}  ${data?.data?.lastName}`;

  return (
    <Box>
      {isLoading ? <Skeleton variant="rectangular" height={40} width={300} sx={{ mb: '16px' }} /> :
        <Typography
          variant="h4"
          fontWeight={600}
          color="text.primary"
          sx={styles.title}
        >
          Welcome back, {userName}
        </Typography>
      }
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={2.7}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6} xl={12}>
              <CompanyProfile />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={6}
              xl={12}
              sx={styles.careerGrowthGridWrap}
            >
              <CareerGrowth />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={5.3}>
          <Reviews />
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
          <GoalsOverview />
        </Grid>

        <Grid item xs={12} xl={6} lg={6} md={12} sm={12}>
          <MyOneOnOnes />
        </Grid>
        <Grid item xs={12} xl={6} lg={6} md={12} sm={12}>
          <TaskToComplete />
        </Grid>
      </Grid>
    </Box>
  );
}
