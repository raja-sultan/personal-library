import React from "react";
import { Button, Typography, Box, Paper, CardContent } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Link from "next/link";
import { MyEmailTemplatesTable } from "./my-templates/my-templates.table";
import { OrganizationEmailTemplatesTable } from "./organization-templates/organization.templates.table";

export function EmailTemplatesSection(): JSX.Element {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Email Templates
        </Typography>
        <Link href="/configuration/email-templates/email-verification">
          <Button variant="outlined" startIcon={<SettingsOutlinedIcon />}>
            Email Settings
          </Button>
        </Link>
      </Box>

      <Paper
        sx={{
          overflowX: "auto",
          maxWidth: 1250,
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
        }}
      >
        <CardContent sx={{ pt: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              My Templates
            </Typography>
            <Link href="/configuration/email-templates/create-email-template?action=add">
              {/* <Link href="/configuration/email-templates/create-email-template?action=add&type=myTemplate"> */}
              <Button variant="outlined">New</Button>
            </Link>
          </Box>
          <Box sx={{ minWidth: 1200, overflowX: "auto" }}>
            {/* My Email Templates Table */}
            <MyEmailTemplatesTable />
          </Box>
        </CardContent>
      </Paper>
      <Paper
        sx={{
          mt: { xs: 3, sm: 4 },
          overflowX: "auto",
          maxWidth: 1250,
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: "6px",
          },
        }}
      >
        <CardContent sx={{ pt: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              Organization Wide Templates
            </Typography>
            <Link href="/configuration/email-templates/create-email-template?action=add">
              <Button variant="outlined">New</Button>
            </Link>
          </Box>
          <Box sx={{ minWidth: 1200, overflowX: "auto" }}>
            {/* Organization Wide Templates */}
            <OrganizationEmailTemplatesTable />
          </Box>
        </CardContent>
      </Paper>
    </>
  );
}
