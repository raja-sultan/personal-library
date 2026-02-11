import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import React, { useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { CustomTable } from "common";
import { useGetFollowJobsQuery } from "@services/dashboard/jobs-following/jobs-following-api";

export function JobsFollowingViewAll(): React.JSX.Element {
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });
  const { data } = useGetFollowJobsQuery({ limit: 10, offset: params.offset });

  const columns = [
    {
      accessorFn: (row: any) => row?.jobInfo?.jobName,
      id: "job",
      cell: (info: any) => (
        <Box sx={{ textAlign: "left" }}>
          <Typography variant="body1" sx={{ fontWeight: "600" }}>
            {info.getValue() ?? "---"}
          </Typography>
        </Box>
      ),
      header: () => (
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-start"
          alignContent="center"
          ml={2}
        >
          <Typography variant="body2" sx={{ fontWeight: "600" }}>
            Job
          </Typography>
        </Box>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.departmentData[0]?.departmentName,
      id: "department",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info.getValue() ?? "---"}</Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Department
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row?.locationData[0]?.address,
      id: "office",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info.getValue() ?? "---"}</Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Office
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => `${row.jobCandidatesCount}`,
      id: "candidates",
      cell: (info: any) => (
        <Typography variant="body2">{info.getValue() ?? "---"}</Typography>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Candidates
        </Typography>
      ),
      isSortable: false,
    },
    // {
    //   accessorFn: (row: any) => `${row.new}`,
    //   id: "new",
    //   cell: (info: any) => (
    //     <Typography variant="body2">
    //       {info.row.original.new ?? "---"}
    //     </Typography>
    //   ),
    //   header: () => (
    //     <Typography variant="body2" sx={{ fontWeight: "600" }}>
    //       New
    //     </Typography>
    //   ),
    //   isSortable: false,
    // },
  ];

  return (
    <Box
      sx={{
        borderRadius: "10px",
        bgcolor: "background.paper",
        px: { md: 3, xs: 2 },
        pt: 4,
        pb: 3,
      }}
    >
      <StyledBackLink href="/dashboard">
        <ArrowCircleLeftIcon sx={{ position: "relative", top: "6px", mr: 1 }} />{" "}
        Back To Dashboard
      </StyledBackLink>
      <Typography variant="h6" sx={{ my: 1 }}>
        Jobs I'm Following
      </Typography>
      <Box sx={{ mt: 3 }}>
        <CustomTable
          data={data?.data?.jobs}
          columns={columns}
          isLoading={false}
          isFetching={false}
          isError={false}
          isPagination
          isSuccess
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
          onPageChange={(onPageData: any) => {
            setParams((prev) => {
              return {
                ...prev,
                offset: (onPageData - 1) * 10,
              };
            });
          }}
        />
      </Box>
    </Box>
  );
}

const StyledBackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.neutral[900],
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
}));
