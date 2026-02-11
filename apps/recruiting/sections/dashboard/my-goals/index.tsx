import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { CustomTable } from "common";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { CreateGoalModal } from "./create-goal-modal";
import Link from "next/link";
import { useGetDashboardMyGoalsQuery } from "@services/dashboard/company-goals-api";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 10,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

export function MyGoals(): React.JSX.Element {
  const { data, isSuccess, isLoading, isFetching, isError } =
    useGetDashboardMyGoalsQuery({
      limit: 4,
      offset: 0,
    });

  const [createNewGoal, setCreateNewGoal] = useState<boolean>(false);
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  const columns = [
    {
      accessorFn: (row: any) => row.activity,
      id: "activity",
      cell: (info: any) => {
        let content;
        if (info?.row?.original?.activity === "CANDIDATES_ADDED") {
          content = "Candidates Added";
        } else if (info?.row?.original?.activity === "PROSPECTS_ADDED") {
          content = "Prospects Added";
        } else if (info?.row?.original?.activity === "CANDIDATES_REFEERED") {
          content = "Candidates Referred";
        } else if (info?.row?.original?.activity === "CANDIDATES_HIRED") {
          content = "Candidates Hired";
        } else {
          content = "---";
        }
        return (
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {content}
          </Typography>
        );
      },
      header: () => <span>Goal</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.frequency,
      id: "frequency",
      cell: (info: any) => {
        return (
          <Typography variant="subtitle2">
            {info.getValue() ?? "---"}
          </Typography>
        );
      },
      header: () => <span>Frequency</span>,
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.progress,
      id: "progress",
      cell: (info: any) => (
        <Box>
          <Typography variant="subtitle2">
            {info.row.original.progress} of {info?.row?.original?.targetValue} (
            {Math.round(
              (info.row.original.progress / info?.row?.original?.targetValue) *
                100
            )}
            %)
          </Typography>
          {(
            <BorderLinearProgress
              variant="determinate"
              value={info.row.original.progress}
            />
          ) ?? "-"}
        </Box>
      ),
      header: () => <span>Progress</span>,
      isSortable: false,
    },
  ];

  return (
    <Box
      mb={2}
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
          px: 2,
        }}
      >
        <Box>
          <Typography variant="h6">My Goals</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => {
              setCreateNewGoal(true);
            }}
          >
            Create New Goal
          </Button>
          <Link href="/dashboard/see-all-goals">
            <Button variant="outlined">See All Goals</Button>
          </Link>
        </Box>
      </Box>
      <CustomTable
        data={data?.data?.myGoals}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        isPagination={false}
        isSuccess={isSuccess}
        // count={Math.ceil(data?.data?.meta?.total / limit)}
        totalPages={data?.data?.meta?.pages ?? 0}
        currentPage={data?.data?.meta?.page ?? 1}
        onPageChange={(onPageData: any) => {
          setParams({
            page: onPageData,
            offset: (onPageData - 1) * 10,
          });
        }}
      />

      <CreateGoalModal
        createNewGoal={createNewGoal}
        setCreateNewGoal={setCreateNewGoal}
      />
    </Box>
  );
}
