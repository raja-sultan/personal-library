"use client";

import React from "react";
import { Box } from "@mui/material";
import { UserManagement as UserManagementSection } from "@sections/user-management/company-user";

function UserManagement(): JSX.Element {
  return (
    <Box>
      <UserManagementSection />
    </Box>
  );
}

export default UserManagement;
