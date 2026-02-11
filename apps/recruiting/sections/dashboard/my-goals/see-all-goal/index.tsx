import { Box, Button, Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import React, { useState } from "react";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { CustomTable } from "common";
import { FormSendModal } from "../../form-send-modal";
import type { SwitchProps } from "@mui/material/Switch";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useGetDashboardMyGoalsQuery } from "@services/dashboard/company-goals-api";
import { CreateGoalModal } from "../create-goal-modal";
import toast from "react-hot-toast";
import { useUpdateMyGoalByIdMutation } from "@services/dashboard/my-goals/my-goals-api";

export function SeeAllGoal(): React.JSX.Element {
  const { data, isSuccess, isLoading, isFetching, isError } =
    useGetDashboardMyGoalsQuery({
      limit: 10,
      offset: 0,
    });
  const [updateMyGoalById] = useUpdateMyGoalByIdMutation();
  const [formSend, setFormSend] = useState<boolean>(false);
  const [createNewGoal, setCreateNewGoal] = useState<boolean>(false);
  const [params, setParams] = useState<any>({
    page: 1,
    offset: 0,
  });

  // const { data, isError, isFetching, isLoading, isSuccess } = useGetUsersQuery({
  //   params: {
  //     limit: 10,
  //     companyUser: true,
  //     offset: params.offset,
  //   },
  // });

  const columns = [
    {
      accessorFn: (row: any) => row.flag,
      id: "flag",
      cell: (info: any) => {
        return (
          <Box sx={{ width: "20px" }}>
            <IOSSwitch
              sx={{ m: 1 }}
              checked={info?.row?.original?.flag}
              size="medium"
              onChange={async () => {
                try {
                  const res: any = await updateMyGoalById({
                    id: info?.row?.original?._id,
                  }).unwrap();
                  toast.success(res?.message || `Status Update Successfully!`);
                } catch (error: any) {
                  const errMsg = error?.data?.message;
                  toast.error(errMsg ?? "Something Went Wrong!");
                }
              }}
            />
          </Box>
        );
      },
      header: () => {
        return <></>;
      },
    },
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
            0 {content}
          </Typography>
        );
      },
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Goal
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.frequency,
      id: "frequency",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info.getValue() ?? "---"}</Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Frequency
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.timePeriod,
      id: "timePeriod",
      cell: (info: any) => (
        <Box>
          <Typography variant="body2">{info.getValue() ?? "---"}</Typography>
        </Box>
      ),
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Time Period
        </Typography>
      ),
      isSortable: false,
    },
    {
      accessorFn: (row: any) => `${row.progress} ${row.progressValue}`,
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
      header: () => (
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Progress
        </Typography>
      ),
      isSortable: false,
    },
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">My Goals</Typography>
        <Button
          variant="outlined"
          sx={{ mr: 1 }}
          onClick={() => {
            setCreateNewGoal(true);
          }}
        >
          Create New Goal
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <CustomTable
          data={data?.data?.myGoals}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isPagination
          isSuccess={isSuccess}
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
          onPageChange={(onPageData: any) => {
            setParams({
              page: onPageData,
              offset: (onPageData - 1) * 10,
            });
          }}
          onSelected={(e) => {
            console.log(e, "selected rows");
          }}
        />
      </Box>

      <FormSendModal formSend={formSend} setFormSend={setFormSend} />
      <CreateGoalModal
        createNewGoal={createNewGoal}
        setCreateNewGoal={setCreateNewGoal}
      />
    </Box>
  );
}

const StyledBackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.neutral[900],
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
}));

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

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#1a90ff" : "#308fe8",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#1a90ff",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
