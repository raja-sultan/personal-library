"use client";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  Button,
  Divider,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { NoContentFound, TableHeader } from "common";
import {
  useGetJobPostsInternalQuery,
  useGetOfficeAndDepartmentQuery,
} from "@services/configuration/job-boards/job-boards-api";
import { useSearchParams } from "next/navigation";

function JobOpenings(): JSX.Element {
  const params = useSearchParams();
  const companyName = params.get("companyName");
  const [search, setSearch] = useState<any>();

  //Offices List API
  const { data: offices } = useGetOfficeAndDepartmentQuery({
    listType: "office",
    company: companyName,
  });

  //Departments API
  const { data: departments } = useGetOfficeAndDepartmentQuery({
    listType: "department",
    company: companyName,
  });

  //Department list
  const departmentList = departments?.data;

  //Offices List
  const officeList = offices?.data;

  const departmentOptions = departmentList?.map((option: any) => {
    return {
      departmentId: option._id,
      label: option.departmentName,
      value: option._id,
    };
  });

  const officeOptions = officeList?.map((option: any) => {
    return {
      officeId: option._id,
      label: option.officeName,
      value: option._id,
    };
  });

  const {
    data: jobPostsInternal,
    isLoading,
    isError,
    isFetching,
  } = useGetJobPostsInternalQuery({
    companyName,
    param: search
      ? {
          ...Object.fromEntries(
            Object.entries(search).filter(
              ([_, v]) => v !== "" && v !== null && v !== undefined
            )
          ),
        }
      : {},
  });

  return (
    <Box sx={{ my: 6 }}>
      <Typography
        sx={{ textAlign: "center", typography: { xs: "h6", sm: "h4" } }}
      >
        Current Job Openings
      </Typography>
      <Container
        sx={{
          my: 6,
        }}
        maxWidth="xxl"
      >
        <Card sx={{ px: 2.5, pt: 0.5 }}>
          <TableHeader
            showClearFilterButton
            onChanged={(e: any) => {
              setSearch(e);
            }}
            tableHeaderData={[
              {
                type: "select",
                FieldProps: {
                  name: "departmentId",
                  label: "Department",
                },
                options: departmentOptions ?? [
                  {
                    id: 1,
                    label: "No Department Found",
                    value: "No Department Found",
                  },
                ],
              },
              {
                type: "select",
                FieldProps: {
                  name: "officeId",
                  label: "Office",
                },
                options: officeOptions ?? [
                  {
                    id: 1,
                    label: "No Office Found",
                    value: "No Office Found",
                  },
                ],
              },
            ]}
          />
        </Card>
        <Grid
          container
          columnSpacing={4}
          rowGap={4}
          sx={{
            position: "relative",
            height: "80vh",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              borderRadius: "6px",
            },
            pr: 2,
            mt: 4,
          }}
        >
          {isError === true || jobPostsInternal?.data?.length === 0 ? (
            <Grid container justifyContent="center">
              <Grid item width={200} sx={{ my: 5 }}>
                <NoContentFound />
              </Grid>
            </Grid>
          ) : (
            <>
              {jobPostsInternal?.data?.map((items) => (
                <Grid item xs={12} md={6} key={items?.departmentId} sx={{}}>
                  <Card sx={{ p: 2.5, borderRadius: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 3,
                      }}
                    >
                      {isLoading ? (
                        <Skeleton
                          variant="rectangular"
                          width={300}
                          height={40}
                        />
                      ) : (
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                          {items?.departmentName ?? "-"}
                        </Typography>
                      )}
                      {isLoading ? (
                        <Skeleton
                          variant="rectangular"
                          width={300}
                          height={40}
                        />
                      ) : (
                        <Link
                          href=""
                          style={{ textDecoration: "none", fontSize: "16px" }}
                        >
                          View All
                        </Link>
                      )}
                    </Box>
                    {items?.jobs?.map((item) => (
                      <>
                        <Box
                          key={item?._id}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            my: 2,
                          }}
                        >
                          <Box>
                            {isLoading ? (
                              <Skeleton
                                variant="rectangular"
                                width={300}
                                height={40}
                              />
                            ) : (
                              <Typography variant="subtitle1">
                                {item?.postDetails?.jobName ?? "-"}
                              </Typography>
                            )}
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 1,
                                gap: 0.5,
                              }}
                            >
                              {isLoading ? (
                                <Skeleton
                                  variant="rectangular"
                                  width={300}
                                  height={40}
                                />
                              ) : (
                                <>
                                  <FmdGoodOutlinedIcon
                                    sx={{ color: "text.secondary" }}
                                  />
                                  <Typography
                                    variant="caption"
                                    sx={{ color: "text.secondary" }}
                                  >
                                    {item?.postDetails?.location ?? "-"}
                                  </Typography>
                                </>
                              )}
                            </Box>
                          </Box>
                          {isLoading ? (
                            <Skeleton
                              variant="rectangular"
                              width={300}
                              height={40}
                            />
                          ) : (
                            <Link
                              href={`careers/job-details?jobPostId=${item?._id}`}
                            >
                              <Button variant="outlined" size="small">
                                Apply for this job
                              </Button>
                            </Link>
                          )}
                        </Box>
                        <Divider />
                      </>
                    ))}
                  </Card>
                </Grid>
              ))}
            </>
          )}
          {isFetching && (
            <Grid
              item
              sx={{
                position: "absolute",
                left: "50%",
                marginLeft: "-20px",
                top: "40%",
              }}
            >
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default JobOpenings;
