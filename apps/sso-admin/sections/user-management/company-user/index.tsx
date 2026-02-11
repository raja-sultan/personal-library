"use client";
import { CustomTabs } from "common";
import { Box, Paper, Typography } from "@mui/material";
import { CompanyUserTable } from "./company-user-table";
import { SystemAdminTable } from "../system-admin/system-admin-table";

export function UserManagement(): JSX.Element {
  return (
    <Paper variant="elevation" elevation={1}>
      <Box py={1} px={2}>
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: "text.primary",
            }}
          >
            User Management
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,
              color: "text.secondary",
            }}
          >
            Manage your users and their account permissions here
          </Typography>
        </Box>
        <Box mt={2}>
          <CustomTabs
            maxWidth={370}
            tabsNameArray={["Company user", "System Admin"]}
          >
            <CompanyUserTable />
            <SystemAdminTable />
          </CustomTabs>
        </Box>
      </Box>
    </Paper>
  );
}
