import { Box, Card, Divider, Stack, Switch, Typography } from "@mui/material";
import React from "react";

const GlobalSettings = () => {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle1">Global settings</Typography>
      <Stack direction="row" py={2} columnGap={2}>
        <Switch />
        <Box>
          <Typography variant="body1" fontWeight="bold">
            All emails for organization
          </Typography>
          <Typography variant="subtitle2" color="neutral.400">
            Turning off this will stop automatically generated emails from going
            out-including task assignments, employee notifications and summary
            reports
          </Typography>
        </Box>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2">Email delivery Time zone</Typography>
      <Typography variant="body2" fontWeight={600}>
        (GMT-07:00) Pacific Time (US & Canada)
      </Typography>
      <Typography variant="subtitle2" color="neutral.400">
        Email will be delivered in this time zone, unless an employee chooses a
        local time zone
      </Typography>
    </Card>
  );
};

export default GlobalSettings;
