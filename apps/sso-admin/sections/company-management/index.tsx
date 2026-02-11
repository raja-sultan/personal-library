"use client";

import { CustomTabs } from "common";
import { Box, Paper, Typography } from "@mui/material";
import { NewRequestTable } from "./new-request-table";
import RegisteredCompanyTable from "./registered-company-table";

export function CompanyManagement(): JSX.Element {
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
            Company Management
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
            maxWidth={430}
            tabsNameArray={["New Requests", "Registered Companies"]}
          >
            <NewRequestTable />
            <RegisteredCompanyTable />
          </CustomTabs>
        </Box>
      </Box>
    </Paper>
  );
}
