"use client";

import { Box, Grid, Paper, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";
import { styled } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { ReportsData } from "./data-reports";

export default function LayoutReports({ children }): JSX.Element {
  const pathName = usePathname();
  const theme: any = useTheme();

  return (
    <Grid container spacing={2.5}>
      <Grid item md={2.5} xs={12}>
        <Paper
          sx={{
            borderRadius: 1,
            py: 2,
            minHeight: "100dvh",
          }}
        >
          <Box>
            {ReportsData.map(({ id, title, link }) => {
              return (
                <Box
                  key={id}
                  sx={{
                    pl: 4,
                    py: 1,
                    backgroundColor:
                      pathName !== link ? "" : theme.palette.primary.lightest,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.lightest,
                    },
                  }}
                >
                  <NavLink href={link}>{title}</NavLink>
                </Box>
              );
            })}
          </Box>
        </Paper>
      </Grid>
      <Grid item md={9.5} xs={12}>
        <Paper
          sx={{
            borderRadius: 1,
            minHeight: "100dvh",
          }}
        >
          {children}
        </Paper>
      </Grid>
    </Grid>
  );
}

const NavLink = styled(Link)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "500",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  color:
    theme.palette.mode === "dark"
      ? theme.palette.text.secondary
      : theme.palette.text.primary,
}));
