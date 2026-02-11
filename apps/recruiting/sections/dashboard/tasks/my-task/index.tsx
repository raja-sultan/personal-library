import { Box, Typography } from "@mui/material";
import { KickoffFromTasksModal } from "@sections/dashboard/tasks/my-task/kickoff-from-tasks-modal";
import { OffersModal } from "@sections/dashboard/tasks/my-task/offers-modal";
import React, { useState } from "react";
import { useGetDashboardTasksQuery } from "@services/dashboard/tasks/tasks-api";
import { useRouter } from "next/navigation";

export function MyTask(): React.JSX.Element {
  const [kickoffForm, setKickoffForm] = useState<boolean>(false);
  const [offers, setOffers] = useState<boolean>(false);

  const { data } = useGetDashboardTasksQuery({});

  const Router = useRouter();

  // const TaskHandler = (value) => {
  //   switch (value) {
  //     case "agencies":
  //       return () => {
  //         setOffers(true);
  //       };
  //     case "forms to send":
  //       return () => {
  //         Router.push("/dashboard/forms-to-send");
  //       };
  //     case "need decision":
  //       return () => {
  //         Router.push("/dashboard/forms-to-send");
  //       };
  //     case "candidate to schedule":
  //       return () => {
  //         Router.push("/candidates");
  //       };
  //     case "offers":
  //       return () => {
  //         setOffers(true);
  //       };
  //     case "kickoff form tasks":
  //       return () => {
  //         setKickoffForm(true);
  //       };
  //     default:
  //       return () => {};
  //   }
  // };

  return (
    <Box>
      {data?.data?.MyTasks?.map((item: any) => {
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
                  // cursor: "pointer",
                  textTransform: "capitalize",
                }}
                // onClick={() => {
                //   const Handler = TaskHandler(item?.category);
                //   Handler();
                // }}
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

      <OffersModal offers={offers} setOffers={setOffers} />
      <KickoffFromTasksModal
        kickoffForm={kickoffForm}
        setKickoffForm={setKickoffForm}
      />
    </Box>
  );
}
