import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useGetDashboardEventListQuery } from "@services/dashboard/company-goals-api";
import dayjs from "dayjs";

export function Events(): React.JSX.Element {
  const theme: any = useTheme();
  const { data } = useGetDashboardEventListQuery({});
  console.log(data?.data?.events);

  return (
    <Box
      sx={{
        mt: 2,
        borderRadius: "12px",
        boxShadow: "0px 0px 4px 0px rgba(16, 24, 40, 0.12)",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">Events</Typography>
        </Box>
        <Box>
          <Link href="/view-events">
            <Button variant="outlined" sx={{ mr: 2 }}>
              See All
            </Button>
          </Link>
          <Link href="/create-event">
            <Button variant="outlined">Create Event</Button>
          </Link>
        </Box>
      </Box>
      {data?.data?.events?.map((item: any) => {
        return (
          <Box
            key={item._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor:
                theme.palette.mode === "light" ? theme.palette.neutral[50] : "",
              p: 2,
            }}
          >
            <Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {item?.isClosed ? "Closed" : "Open"}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "600" }}>
                {item?.eventDetails?.eventName}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                No Prospects From Event
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {`${dayjs(item?.eventDetails?.startDate).format(
                "MMM DD"
              )} - ${dayjs(item?.eventDetails?.endDate).format("MMM DD")} ${
                item?.eventDetails?.location
              }`}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
