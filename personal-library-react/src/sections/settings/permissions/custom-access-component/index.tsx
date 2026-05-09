import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";
import { CustomTabs } from "common";
import { CustomAccessSettingsSection } from "./setting-sec";
import { CustomAccessUserSection } from "./user-sec";

export function CustomAccessComponentSection(props): JSX.Element {
  const roleName = props.searchParams.roleName;

  return (
    <Box>
      <Box sx={{ display: "flex", mb: 2 }}>
        <StyledBackLink href="/settings/permissions">Permissions</StyledBackLink>
        <ArrowForwardIosIcon
          sx={{ fontSize: "small", mx: 2, position: "relative", top: "6px" }}
        />
        <StyledBackLink href="">{roleName}</StyledBackLink>
      </Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {roleName}
      </Typography>
      <Box sx={{ bgcolor: "background.paper", p: 1.5, borderRadius: 1, mt: 2 }}>
        <CustomTabs tabsNameArray={["User", "Settings"]}>
          <Box>
            <CustomAccessUserSection />
          </Box>
          <Box>
            <CustomAccessSettingsSection roleName={roleName} />
          </Box>
        </CustomTabs>
      </Box>
    </Box>
  );
}

const StyledBackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.neutral[900],
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
}));
