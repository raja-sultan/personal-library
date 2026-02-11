import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { CustomBreadCrumbs } from "common";
import {
  useGetLastViewedReportQuery,
  useGetOverviewSavedReportQuery,
} from "@services/reports/overview/overview-report-api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function OverviewReport(): JSX.Element {
  const breadcrumbs = [
    { key: "1", value: "Home", link: "/dashboard" },
    { key: "2", value: "Reports", link: "/reports" },
    { key: "3", value: "Overview", link: "" },
  ];

  const { data } = useGetOverviewSavedReportQuery({
    params: {
      offset: 0,
      limit: 10,
    },
  });
  const savedReportData = data?.data?.report;

  const { data: lastViewed } = useGetLastViewedReportQuery({
    params: {
      offset: 0,
      limit: 10,
    },
  });
  const lastViewReportData = lastViewed?.data?.report;

  return (
    <Paper
      sx={{
        p: 2,
        a: {
          textDecoration: "none !important",
          color: "text.primary",
        },
      }}
    >
      <Box sx={{ mb: 2 }}>
        <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      </Box>
      <Box
        sx={{
          mb: 2,
        }}
      >
        <Typography gutterBottom variant="h6">
          Recently Viewed
        </Typography>
      </Box>
      <Paper
        sx={{
          px: 2,
          py: 1,
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "background.default",
        }}
      >
        <Typography variant="subtitle1">Name</Typography>
        <Typography variant="subtitle1">Last viewed</Typography>
      </Paper>
      <Box
        sx={{
          maxHeight: { xs: 150, sm: 200, lg: 250 },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            display: "none",
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
        }}
      >
        {lastViewReportData?.map((cardItems) => (
          <Paper
            key={cardItems.id}
            sx={{
              mb: 1,
              pt: 1.5,
              pb: 0.5,
              px: 2,
              backgroundColor: "background.default",
            }}
          >
            <Link href="/reports/dashboard">
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="h5"
                    color="primary.main"
                    m={0}
                    sx={{ lineHeight: 0.5 }}
                  >
                    {cardItems.name}
                  </Typography>

                  <Typography variant="caption" color="primary.900">
                    {cardItems.reportType}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">
                    <Typography variant="subtitle2">
                      {dayjs(cardItems?.viewedAt).fromNow()}
                    </Typography>
                  </Typography>
                </Box>
              </Stack>
            </Link>
          </Paper>
        ))}
      </Box>

      <Box
        sx={{
          my: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h6">
          Saved Report
        </Typography>
        <Link href="/reports/saved-reports">
          <Button
            variant="contained"
            size="medium"
            sx={{ color: "neutral.200", borderColor: "neutral.300" }}
          >
            View All
          </Button>
        </Link>
      </Box>
      <Paper
        sx={{
          px: 2,
          py: 1,
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "background.default",
        }}
      >
        <Typography variant="subtitle1">Name</Typography>
        <Typography variant="subtitle1">Last Saved</Typography>
      </Paper>
      <Box
        sx={{
          maxHeight: { xs: 150, sm: 200, lg: 250 },
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            display: "none",
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
        }}
      >
        {savedReportData?.map((cardItems) => (
          <Paper
            key={cardItems.id}
            sx={{
              mb: 1,
              pt: 1.5,
              pb: 0.5,
              px: 2,
              backgroundColor: "background.default",
            }}
          >
            <Link href="/reports/dashboard">
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ textDecoration: "none" }}>
                  <Link href="/reports/dashboard">
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="h5"
                      color="primary.main"
                      m={0}
                      sx={{ lineHeight: 0.5 }}
                    >
                      {cardItems.name}
                    </Typography>
                  </Link>
                  <Typography variant="caption" color="primary.900">
                    {cardItems.reportType}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2">
                    {dayjs(cardItems?.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Stack>
            </Link>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
}
