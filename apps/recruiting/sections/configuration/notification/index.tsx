import { Stack, Typography } from "@mui/material";
import { CustomTabs } from "common";
import React from "react";
import { JobSection } from "./job-section";
import { UserSection } from "./user-section";

export function NotificationSection(): React.JSX.Element {
  return (
    <Stack rowGap={0.5}>
      <Typography variant="h5">Notification</Typography>
      <Typography variant="body1" fontWeight={600} sx={{ mt: 2 }}>
        Set notification by :
      </Typography>
      <CustomTabs tabsNameArray={["Job", "User"]}>
        <JobSection />
        <UserSection />
      </CustomTabs>
    </Stack>
  );
}
