"use client";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import React from "react";
import { ApplicationTrendsCard } from "./application-trends-card";
import { CandidateSourceBreakdownCard } from "./breakdown-and-quality-card";
import { PipelineCard } from "./pipeline-card";
import { ProspectingCard } from "./prospecting-card";
import { JobSetupCard } from "./job-setup-card";
import { CandidateFollowCard } from "./candidate-i-follow-card";
import { PipelineTaskCard } from "./pipeline-task-card";
import { useGetJobDashboardDataQuery } from "@services/jobs/job-details/job-dashboard/job-dashboard-api";
import { useSearchParams } from "next/navigation";
import { JobDetailsHeader } from "../job-details-header";

export function JobsDashboard(): JSX.Element {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const { data, isLoading, isSuccess } = useGetJobDashboardDataQuery(jobId);

  return (
    <Box>
      <JobDetailsHeader mainTitle="Dashboard" />
      {isLoading && (
        <Box
          display="flex"
          gap={2}
          alignItems="center"
          justifyContent="center"
          py={5}
        >
          <Typography color="primary" variant="h5" fontWeight={600}>
            Loading...
          </Typography>
          <CircularProgress size={40} />
        </Box>
      )}
      {isSuccess && (
        <>
          <Typography variant="h5" p={1}>
            Care Team Lead
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Box borderRadius={2} boxShadow={2} p={2} mb={2.5}>
                <ApplicationTrendsCard
                  activeTrends={data?.data?.activeTrends}
                  newTrends={data?.data?.newTrends}
                  rejectedTrends={data?.data?.rejectedTrends}
                />
              </Box>
              <Box borderRadius={2} boxShadow={2} py={2}>
                <CandidateSourceBreakdownCard />
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={6} minHeight="100%">
              <Box
                // height="300px"
                borderRadius={2}
                boxShadow={2}
                p={2}
                mb={2.5}
                overflow="auto"
              >
                <PipelineCard pipeline={data?.data?.pipeline} />
              </Box>
              <Box borderRadius={2} boxShadow={2} p={2} mb={2.5}>
                <ProspectingCard prospect={data?.data?.prospects} />
              </Box>
              <Box
                // height="328px"
                borderRadius={2}
                boxShadow={2}
                p={2}
                mb={2.5}
                overflow="auto"
              >
                <JobSetupCard />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box minHeight="300px" borderRadius={2} boxShadow={2} p={2}>
                <CandidateFollowCard />
              </Box>
            </Grid>
            <Grid item xs={12} md={12}>
              <Box minHeight="200px" borderRadius={2} boxShadow={2} p={2}>
                <PipelineTaskCard />
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
