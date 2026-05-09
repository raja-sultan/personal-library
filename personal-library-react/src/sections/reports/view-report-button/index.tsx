import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";

const RecentViewArray = [
  {
    id: 1,
    title: "E-Signature report",
    subTitle: "Track the status of E-Signatures assigned to your new hires.",
    lastViewed: "View E-Signature Report",
    link: "/reports/view-e-signature-report",
  },
  {
    id: 2,
    title: "Report on new hires",
    subTitle: "See what's left to complete to get your New Hires onboarded.",
    lastViewed: "View New Hires Report",
    link: "/reports/view-new-hires-report",
  },
  {
    id: 3,
    title: "Report on pending hires",
    subTitle: "See which hires need to be assigned an onboarding plan.",
    lastViewed: "View Pending Hires Report",
    link: "/reports/view-pending-hires-report",
  },
  {
    id: 4,
    title: "See all the tasks assigned to new hires",
    subTitle:
      "See all the tasks that have been assigned to get your new hires onboarded.",
    lastViewed: "View Task Report",
    link: "/reports/view-task-report",
  },
  {
    id: 5,
    title: "Stay on top of onboarding feedback",
    subTitle:
      "See what kind of feedback your company’s New Hires are leaving as they are onboarded.",
    lastViewed: "View Feedback Report",
    link: "/reports/view-feedback-report",
  },
  {
    id: 5,
    title: "New hire changes",
    subTitle:
      "Review new hire changes from Personnel Library  and how they affect the onboarding plan.",
    lastViewed: "View New Hire Changes",
    link: "/reports/view-new-hire-changes",
  },
];

export function ViewReportButton(): JSX.Element {
  return (
    <Paper
      sx={{
        a: {
          textDecoration: "none !important",
          color: "unset",
        },
      }}
    >
      <Box
        sx={{
          mb: 2,
        }}
      >
        <Typography gutterBottom variant="h6">
          Reports
        </Typography>
      </Box>
      <Box
        sx={{
          maxHeight: { xs: 250, sm: 300, lg: 350 },
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
        {RecentViewArray.map((cardItems) => (
          <Paper
            key={cardItems.id}
            sx={{
              mb: 1,
              px: 2,
              py: 1,
            }}
          >
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
                  variant="body1"
                  // color="primary.main"
                  m={0}
                  sx={{ fontWeight: 600 }}
                >
                  {cardItems.title}
                </Typography>

                <Typography variant="caption" color="primary.900">
                  {cardItems.subTitle}
                </Typography>
              </Box>
              <Box>
                <Link href={cardItems.link}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ color: "neutral.200", borderColor: "neutral.300" }}
                  >
                    {cardItems.lastViewed}
                  </Button>
                </Link>
              </Box>
            </Stack>
          </Paper>
        ))}
      </Box>
    </Paper>
  );
}
