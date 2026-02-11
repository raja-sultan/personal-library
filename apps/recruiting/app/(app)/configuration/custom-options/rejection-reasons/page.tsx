"use client";

import { Box } from "@mui/material";
import { CustomBreadCrumbs } from "common";
import RejectedReason from "@sections/configuration/custom-options/rejected-reason";

function RejectionReasons(): JSX.Element {
  const breadcrumbs = [
    { key: "", value: "Configuration", link: "/configuration" },
    { key: "", value: "Custom Options", link: "/configuration/custom-options" },
    { key: "", value: "Manage Rejection Reasons", link: "" },
  ];
  return (
    <Box>
      <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      <RejectedReason />
    </Box>
  );
}

export default RejectionReasons;
