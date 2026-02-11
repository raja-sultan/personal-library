"use client";

import { Box, Grid, Typography, styled } from "@mui/material";
import Link from "next/link";
import { ConfigurationDashboardData } from "./data-dashboard";

function Configuration(): JSX.Element {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Configuration
      </Typography>
      <Grid container spacing={3}>
        {ConfigurationDashboardData.map(
          ({ Image, id, title, link, description }) => {
            return (
              <Grid key={id} item xl={4} md={6} xs={12}>
                <NavLink href={link}>
                  <Box
                    sx={{
                      display: "flex",
                      minHeight: "120px",
                      p: 2,
                      borderRadius: 1,
                      backgroundColor: "white",
                      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.24)",
                      "&:hover": {
                        backgroundColor: "#F4F3FF",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#F9F9FA",
                        p: 2,
                        borderRadius: 1,
                        height: "70px",
                        width: "70px",
                      }}
                    >
                      <Image sx={{ mr: 1, color: "red" }} />
                    </Box>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6">{title}</Typography>
                      <Typography variant="body1">{description}</Typography>
                    </Box>
                  </Box>
                </NavLink>
              </Grid>
            );
          }
        )}
      </Grid>
    </Box>
  );
}

export default Configuration;

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.neutral[900],
  fontSize: "16px",
  fontWeight: "500",
  textDecoration: "none",
}));
