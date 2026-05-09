import React from "react";

import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import Link from "next/link";

const OverviewSettingData = [
  {
    id: 1,
    title: "Onboarding Plan Defaults",
    description:
      "Create a plan for your new hires so nothing falls through the cracks and they are set up for success on day one.",
    link: "/settings/other-criteria",
  },
  {
    id: 2,
    title: "Company Info",
    description: "Add Details about your company’s departments and locations.",
    link: "/settings/department",
  },
  {
    id: 3,
    title: "New Hire Experience",
    description: "Build out all the pages of a new hire’s Welcome Experience.",
    link: "/settings/pages",
  },
];

export function SettingsOverviewSection(): JSX.Element {
  return (
    <Box>
      <Typography variant="h6">Welcome to Onboarding!</Typography>
      <Typography
        variant="body1"
        sx={{ mb: 2, mt: 1, color: "text.secondary" }}
      >
        This is where you can setup all the different parts of Onboarding to
        best support your organization.
      </Typography>
      <Grid container spacing={2}>
        {OverviewSettingData.map((item: any) => {
          return (
            <Grid key={item.id} item sm={6} xs={12}>
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: "background.paper",
                  boxShadow: 2,
                  borderRadius: 1,
                  minHeight: "220px",
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.description}
                </Typography>
                <Divider sx={{ py: 1 }} />
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <Link href={item.link}>
                    <Button variant="outlined">Get Started</Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
