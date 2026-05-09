import React from "react";

import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export function DefaultAccessSection(): JSX.Element {
  return (
    <Box sx={{ p: 1.5 }}>
      <Typography sx={{ fontWeight: 500 }}>Default Access</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Employee Access
          </Typography>
          <Typography variant="body2">
            <FiberManualRecordIcon sx={{ fontSize: "small", mr: 1 }} />
            Change what employees can view and edit for themselves
          </Typography>
          <Typography variant="body2">
            <FiberManualRecordIcon sx={{ fontSize: "small", mr: 1 }} />
            Configure what employees can see on their coworkers’ profiles
          </Typography>
        </Box>
        <Link href="/settings/permissions/default-access-for-employee">
          <Button variant="outlined">Edit</Button>
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Manager Additional Access
          </Typography>
          <Typography variant="body2">
            <FiberManualRecordIcon sx={{ fontSize: "small", mr: 1 }} />
            Grant special permissions to employees that have direct reports
          </Typography>
          <Typography variant="body2">
            <FiberManualRecordIcon sx={{ fontSize: "small", mr: 1 }} />
            Give employees access to edit their direct reports’ information
          </Typography>
        </Box>
        <Link href="/settings/permissions/manager-additional-access">
          <Button variant="outlined">Edit</Button>
        </Link>
      </Box>
    </Box>
  );
}
