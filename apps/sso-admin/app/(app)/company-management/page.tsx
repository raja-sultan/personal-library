"use client";

import React from "react";
import { Box } from "@mui/material";

import { CompanyManagement as CompanyManagementSection } from "@sections/company-management";

function CompanyManagement(): JSX.Element {
  return (
    <Box>
      <CompanyManagementSection />
    </Box>
  );
}

export default CompanyManagement;
