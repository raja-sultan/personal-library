"use client";
import React from "react";
import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import { PersonalDetailSection } from "@sections/dashboard/application-review/application-review-details/personal-details";
import { ReviewButton } from "@sections/dashboard/application-review/review-buttons";
import { CustomBreadCrumbs, IsFetching } from "common";
import { ApplicationHistorySection } from "./application-history";
import { CandidateDetailsSection } from "./candidate-details";
// import { useGetApplicationCandidateQuery } from "@services/candidate/application-candidate/application-candidate-api";
import { useSearchParams } from "next/navigation";
import { useGetJobCandidateQuery } from "@services/jobs/job-details/pipeline-api";

export function ApplicationReviewDetails(): React.JSX.Element {
  const breadcrumbs = [
    { key: "", value: "Dashboard", link: "/dashboard" },
    { key: "", value: "Application Review", link: "" },
  ];
  const theme = useTheme();
  // const params = useSearchParams();
  // const candidateId = params.get("candidateId");

  // const  {data}  = useGetApplicationCandidateQuery({ candidateId });
  // const candidateData = data?.data?.[0];

  const params = useSearchParams();

  const { data, isLoading, isFetching } = useGetJobCandidateQuery({
    candidateId: params.get("candidateId"),
  });

  const candidateData = data?.data;

  // console.log(
  //   "🚀 ~ ApplicationReviewDetails....................... ~ data:",
  //   data
  // );
  if (isLoading || isFetching) {
    return (
      <Box position="relative" height="100vh">
        <IsFetching isFetching />
      </Box>
    );
  }
  return (
    <Card sx={{ boxShadow: theme.shadows[16], borderRadius: "10px", p: 2 }}>
      <Grid item xs={12}>
        <CustomBreadCrumbs breadcrumbs={breadcrumbs} />

        <Card
          sx={{
            boxShadow: theme.shadows[16],
            borderRadius: "10px",
            mt: 1,
            px: 2,
            py: 1,
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            // mb={2}
          >
            <Grid item md={6} xs={12}>
              <Typography variant="h5" fontWeight={600}>
                {`${candidateData?.nameAndCompany?.firstName ?? "---"} ${candidateData?.nameAndCompany?.lastName ?? "---"}`}
              </Typography>
            </Grid>
            <Grid item container justifyContent="end" xs={12} md={6}>
              <ReviewButton />
            </Grid>
          </Grid>
        </Card>
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card
              sx={{
                boxShadow: theme.shadows[16],
                borderRadius: "10px",
                mt: 1,
                px: 2,
                py: 3,
              }}
            >
              <CandidateDetailsSection candidateData={candidateData} />
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card
              sx={{
                boxShadow: theme.shadows[16],
                borderRadius: "10px",
                mt: 1,
                px: 2,
                py: 1,
              }}
            >
              <PersonalDetailSection candidateData={candidateData} />
            </Card>
            <Card
              sx={{
                boxShadow: theme.shadows[16],
                borderRadius: "10px",
                mt: 1,
                px: 2,
                py: 1,
              }}
            >
              <ApplicationHistorySection candidateData={candidateData} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
