import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useGetDashboardMyInterviewsQuery } from "@services/dashboard/company-goals-api";
import dayjs from "dayjs";
import { SeePostInterviewsFormModal } from "./see-post-interviews-modal";

export function MyInterviews(): React.JSX.Element {
  const [postInterviews, setPostInterviews] = useState<boolean>(false);

  const { data } = useGetDashboardMyInterviewsQuery({ today: true });

  return (
    <Box
      sx={{
        mt: 2,
        px: 2,
        pt: 1,
        borderRadius: "12px",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h6">My Interviews</Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            onClick={() => {
              setPostInterviews(true);
            }}
          >
            See Past Interviews
          </Button>
        </Box>
      </Box>
      {data?.data ? (
        <Typography>No Interview Today</Typography>
      ) : (
        data?.data?.map((item: any) => {
          return (
            <Box
              key={item?.id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 0.5,
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {item?.name ?? "---"}
              </Typography>
              <Typography variant="body2" color="#667085">
                {`Today, ${ 
                  dayjs(item?.startTime).format("h:mm a") 
                  } - ${ 
                  dayjs(item?.endTime).format("h:mm a")}`}
              </Typography>
              <Link href="#">
                <Typography sx={{ fontWeight: 600 }}>See Scorecard</Typography>
              </Link>
            </Box>
          );
        })
      )}

      <SeePostInterviewsFormModal
        postInterviews={postInterviews}
        setPostInterviews={setPostInterviews}
      />
    </Box>
  );
}
