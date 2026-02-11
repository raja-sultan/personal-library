"use client";

import { Box, Grid, Typography, styled, useTheme } from "@mui/material";
import Link from "next/link";
import { CustomOptionsData } from "./data-custom-options";

function CustomOptions(): JSX.Element {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "background.default",
          p: 1.5,
          borderRadius: 1,
          mb: 3,
        }}
      >
        <Typography variant="body1">
          While using Personnel Library you may have created custom tags,
          sources, and rejection reasons. This page is your launching Point to
          edit or delete any of that custom data.
        </Typography>
      </Box>
      <Box>
        {CustomOptionsData.map((category: any) => {
          return (
            <Box key={category.id}>
              <Typography variant="h5" sx={{ mb: 4 }}>
                {category.outerTitle}
              </Typography>
              <Grid container spacing={3} sx={{ mb: 3 }}>
                {category.list.map(({ Image, id, title, link }) => {
                  return (
                    <Grid key={id} item xl={2.4} md={6} xs={12}>
                      <NavLink href={link}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            minHeight: "180px",
                            textAlign: "center",
                            p: 2,
                            borderRadius: 1,
                            backgroundColor:
                              theme.palette.mode === "light"
                                ? "background.paper"
                                : "background.default",
                            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.24)",
                            "&:hover": {
                              backgroundColor: theme.palette.primary.lightest,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 1,
                              height: "70px",
                              width: "70px",
                              backgroundColor: theme.palette.primary.lightest,
                              "&:hover": {
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? theme.palette.primary.light
                                    : theme.palette.primary.lightest,
                              },
                            }}
                          >
                            <Image sx={{ mr: 1, color: "red" }} />
                          </Box>
                          <Typography
                            variant="h6"
                            sx={{ mt: 2, color: "text.secondary" }}
                          >
                            {title}
                          </Typography>
                        </Box>
                      </NavLink>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default CustomOptions;

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.neutral[900],
  fontSize: "16px",
  fontWeight: "500",
  textDecoration: "none",
}));
