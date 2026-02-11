import { Box, Typography } from "@mui/material";
import { OffersAllTaskModal } from "@sections/dashboard/tasks/all-task/offers-all-task-modal";
import { PendingApprovalsModal } from "@sections/dashboard/tasks/all-task/pending-approvals-modal";
import { ScorecardDueModal } from "@sections/dashboard/tasks/all-task/scorecard-due-modal";
import { useGetDashboardTasksQuery } from "@services/dashboard/tasks/tasks-api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function AllTask(): React.JSX.Element {
  const [pendingApprovals, setPendingApprovals] = useState<boolean>(false);
  const [offersAllTask, setOffersAllTask] = useState<boolean>(false);
  const [scorecardDue, setScorecardDue] = useState<boolean>(false);

  const { data } = useGetDashboardTasksQuery({});
  const Router = useRouter();

  const TaskHandler = (value) => {
    switch (value) {
      case "agencies":
        return () => {
          setOffersAllTask(true);
        };
      case "alerts":
        return () => {
          setOffersAllTask(true);
        };
      case "forms to send":
        return () => {
          Router.push("/dashboard/forms-to-send");
        };
      case "upcoming interviews today":
        return () => {
          Router.push("/dashboard/forms-to-send");
        };
      case "new application to review":
        return () => {
          Router.push("/jobs");
        };
      case "hiring manager review":
        return () => {
          Router.push("/dashboard/forms-to-send");
        };
      case "needs decision":
        return () => {
          Router.push("/dashboard/forms-to-send");
        };
      case "candidate to schedule":
        return () => {
          setOffersAllTask(true);
        };
      case "offers":
        return () => {
          setOffersAllTask(true);
        };
      case "scorecards due":
        return () => {
          setScorecardDue(true);
        };
      case "pending approvals":
        return () => {
          setPendingApprovals(true);
        };
      default:
        return () => {};
    }
  };

  return (
    <Box>
      {data?.data?.AllTasks?.map((item: any) => {
        return (
          <Box
            key={item?._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  cursor: "pointer",
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  const Handler = TaskHandler(item?.category);
                  Handler();
                }}
              >
                {item?.category}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2">{item?.count}</Typography>
            </Box>
          </Box>
        );
      })}

      <ScorecardDueModal
        scorecardDue={scorecardDue}
        setScorecardDue={setScorecardDue}
      />
      <OffersAllTaskModal
        offersAllTask={offersAllTask}
        setOffersAllTask={setOffersAllTask}
      />
      <PendingApprovalsModal
        pendingApprovals={pendingApprovals}
        setPendingApprovals={setPendingApprovals}
      />
    </Box>
  );
}
