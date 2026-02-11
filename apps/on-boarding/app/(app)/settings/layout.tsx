"use client";

import { Box, Grid, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import React from "react";
import { styled } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import { SettingsData } from "./data-settings";

export default function LayoutSettings({ children }): JSX.Element {
  const pathName = usePathname();
  const theme: any = useTheme();

  return (
    <Grid container spacing={2}>
      <Grid item md={2.5} xs={12}>
        <Box
          sx={{
            borderRadius: 1,
            backgroundColor: "background.paper",
            py: 2,
            minHeight: "75vh",
          }}
        >
          <Box>
            {SettingsData.map((item: any, index: any) => {
              return (
                <Box key={item.id}>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        pl: 2,
                        mt: index !== 0 ? 1 : 0,
                        mb: index !== item.length - 1 ? 1 : 0,
                      }}
                    >
                      {item.outerTitle}
                    </Typography>
                  </Box>
                  {item.settingList.map(({ id, title, link }) => {
                    return (
                      <Box
                        key={id}
                        sx={{
                          pl: 3,
                          py: 1.2,
                          borderLeft:
                            pathName !== link
                              ? ""
                              : `5px solid ${theme.palette.primary.main}`,
                          borderTopLeftRadius: pathName !== link ? "" : "8px",
                          borderBottomLeftRadius: "8px",
                          backgroundColor:
                            pathName !== link
                              ? ""
                              : theme.palette.primary.lightest,
                          "&:hover": {
                            backgroundColor: "#F4F3FF",
                            borderLeft: `5px solid ${theme.palette.primary.main}`,
                            borderTopLeftRadius: "8px",
                          },
                        }}
                      >
                        <NavLink href={link}>{title}</NavLink>
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Grid>
      <Grid item md={9.5} xs={12}>
        <Box
          sx={{
            borderRadius: 1,
            p: 2,
            backgroundColor: "background.paper",
          }}
        >
          {children}
        </Box>
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
  color: theme.palette.text.secondary,
}));
