"use client";

import { Box, Grid, Typography, styled, useTheme } from "@mui/material";
import Link from "next/link";
import { DevCenterData } from "./data-dev-center";

function DevCenter(): JSX.Element {
  const theme: any = useTheme();
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Dev Center
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {DevCenterData.map(({ Image, id, title, link, subTitle }) => {
          return (
            <Grid key={id} item md={6} xs={12}>
              <NavLink href={link}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    borderRadius: 1,
                    backgroundColor: "background.default",
                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.24)",
                    "&:hover": {
                      backgroundColor: "#F4F3FF",
                    },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: theme.palette.primary.lightest,
                      p: 2,
                      borderRadius: 1,
                      mr: 2,
                      height: "70px",
                      width: "70px",
                    }}
                  >
                    <Image sx={{ mr: 1, color: "red" }} />
                  </Box>
                  <Box>
                    <Typography variant="h6">{title}</Typography>
                    <Typography variant="body1">{subTitle}</Typography>
                  </Box>
                </Box>
              </NavLink>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default DevCenter;

const NavLink = styled(Link)(({ theme }) => ({
  color:
    theme.palette.mode === "dark"
      ? theme.palette.neutral[400]
      : theme.palette.neutral[900],
  fontSize: "16px",
  fontWeight: "500",
  textDecoration: "none",
}));
