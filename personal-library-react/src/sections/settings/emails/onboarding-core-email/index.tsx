import React from "react";
import { Card, Typography } from "@mui/material";
import { OnboardingCoreEmailTable } from "./onboarding-core-email-table";

const OnboardingCoreEmail = () => {
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="subtitle1" sx={{ color: "text.primary", my: 2 }}>
        Personal Library Onboarding core emails
      </Typography>
      <OnboardingCoreEmailTable />
    </Card>
  );
};

export default OnboardingCoreEmail;
