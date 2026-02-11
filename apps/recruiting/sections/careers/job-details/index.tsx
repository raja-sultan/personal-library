"use client";

import { bgImage } from "@assets/images";
import {
  Container,
  Typography,
  Box,
  Button,
  Skeleton,
  Grid,
} from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useGetJobPostsDescriptionQuery } from "@services/configuration/job-boards/job-boards-api";
import { NoContentFound } from "common";

export function JobDetailsSection(): JSX.Element {
  const searchParams = useSearchParams();
  const jobPostId = searchParams.get("jobPostId");

  //GET API FOR JOB DETAILS
  const { data, isLoading, isError } = useGetJobPostsDescriptionQuery({
    jobPostId,
  });

  const jobDetails = data?.data?.postDetails;
  const jobDescription = data?.data?.postDescription;

  return (
    <Box sx={{ background: "radial-gradient( #7555ef, #502fb4)" }}>
      <Box
        sx={{
          maxHeight: "90dvh",
          backgroundImage: `url(${bgImage.src})`,
          backgroundPosition: "right center",
          backgroundSize: 1000,
          backgroundRepeat: "no-repeat",
          pt: {
            xs: 20,
            sm: 25,
          },
          pb: {
            md: 10,
            xs: 3,
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            minHeight: "40dvh",
            alignItems: "center",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "6px",
            },
            overflow: "auto",
          }}
        >
          {isError === true || data?.data?.length === 0 ? (
            <Grid container justifyContent="center">
              <Grid item width={200} sx={{ mt: { xs: 5, sm: 8 } }}>
                <NoContentFound />
              </Grid>
            </Grid>
          ) : (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Box>
                  {isLoading ? (
                    <Skeleton variant="rectangular" width={300} height={50} />
                  ) : (
                    <Typography
                      sx={{
                        typography: {
                          xs: "h3",
                          sm: "h3",
                        },
                        letterSpacing: "-1.2px",
                      }}
                      color="common.white"
                    >
                      {jobDetails?.jobName ?? "No Job Found"}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 0.5,
                      alignItems: "center",
                      mb: { xs: 3, sm: 4 },
                      mt: 0.5,
                    }}
                  >
                    {isLoading ? (
                      <Skeleton variant="text" width={210} height={40} />
                    ) : (
                      <>
                        <FmdGoodOutlinedIcon sx={{ color: "common.white" }} />
                        <Typography variant="body1" color="common.white">
                          {jobDetails?.location ?? "No Location Found"}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Box>
                {isLoading ? (
                  <Skeleton variant="rectangular" width={240} height={60} />
                ) : (
                  <Link
                    href={`job-details/apply-for-job?jobId=${data?.data?.jobId}&openingId=${data?.data?.jobOpeningId}&jobName=${jobDetails?.jobName}`}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        mb: { xs: 2.5, sm: 0 },
                        backgroundColor: "primary.lightest",
                        color: "common.black",
                        "&:hover": {
                          backgroundColor: "primary.lightest",
                          color: "common.black",
                        },
                      }}
                    >
                      Apply For This Job
                    </Button>
                  </Link>
                )}
              </Box>
              {isLoading ? (
                <Skeleton variant="text" width={210} height={40} />
              ) : (
                <Typography
                  variant="h5"
                  color="common.white"
                  sx={{ mb: 3, fontWeight: 600 }}
                >
                  Job Description
                </Typography>
              )}
              <Box sx={{ pr: { xs: "", lg: 50 } }}>
                <Box>
                  {isLoading ? (
                    <Skeleton variant="rectangular" width={320} height={40} />
                  ) : (
                    <Typography
                      variant="body2"
                      color="common.white"
                      sx={{
                        mb: 3,
                      }}
                    >
                      {jobDescription?.descriptionIntroduction ?? "No Data"}
                    </Typography>
                  )}

                  {isLoading ? (
                    <Skeleton variant="rectangular" width={320} height={40} />
                  ) : (
                    <Typography
                      variant="body2"
                      color="common.white"
                      sx={{
                        mb: 3,
                      }}
                    >
                      {jobDescription?.body ?? "No Data"}
                    </Typography>
                  )}
                  {isLoading ? (
                    <Skeleton variant="rectangular" width={320} height={40} />
                  ) : (
                    <Typography
                      variant="body2"
                      color="common.white"
                      sx={{
                        mb: 3,
                      }}
                    >
                      {jobDescription?.descriptionConclusion ?? "No Data"}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}
