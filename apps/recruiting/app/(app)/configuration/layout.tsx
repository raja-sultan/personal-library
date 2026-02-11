"use client";

import { Box, Grid, Stack, Typography, useTheme } from "@mui/material";
import { SettingsContext } from "common";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { ConfigurationNavList } from "./data";

export default function LayoutConfiguration({ children }): JSX.Element {
  const pathName = usePathname();
  const themeContext = useContext(SettingsContext);
  const { paletteMode } = themeContext;
  const theme: any = useTheme();
  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <Box
          sx={{
            borderRadius: 1,
            backgroundColor: "background.paper",
            py: 2,
            minHeight: "75vh",
          }}
        >
          {ConfigurationNavList.map(({ Image, id, title, link }) => {
            return (
              <Box
                key={id}
                sx={{
                  px: 2,
                  py: 1,
                  backgroundColor: !pathName.includes(link)
                    ? ""
                    : theme.palette.primary.lightest,
                  "&:hover": {
                    backgroundColor:
                      paletteMode === "light"
                        ? theme.palette.primary.lightest
                        : "",
                  },
                  a: {
                    textDecoration: "none",
                  },
                }}
              >
                <Link href={link}>
                  <Stack
                    // sx={{
                    //   color:
                    //     paletteMode === "light"
                    //       ? "neutral.900"
                    //       : "primary.main",
                    //   fontSize: "16px",
                    //   fontWeight: "500",

                    //   alignItems: "center",
                    // }}
                    flexDirection="row"
                    alignItems="center"
                  >
                    <Image sx={{ mr: 1 }} />

                    <Typography
                      variant="body1"
                      color={
                        paletteMode === "light"
                          ? "text.primary"
                          : "text.secondary"
                      }
                    >
                      {title}
                    </Typography>
                  </Stack>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Grid>
      <Grid item md={9} xs={12}>
        <Box
          sx={{
            borderRadius: 1,
            backgroundColor: "background.paper",
            px: 2,
            pt: 2,
            pb: 5,
            minHeight: "500px",
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
