"use client";

import React, { useState } from "react";
import { Box, Container, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Image from "next/image";
import { orcaloLogo } from "@assets/images";

export function CareersHeader(): JSX.Element {
  const [elevate, setElevate] = useState<boolean>(false);
  return (
    <Box
      component="header"
      sx={{
        left: 0,
        position: "absolute",
        right: 0,
        top: 0,
        pt: 6,
        zIndex: (theme) => theme.zIndex.appBar,
        ...(elevate && {
          pt: 0,
          backgroundColor: "common.white",
        }),
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          maxWidth: "95%",
          backdropFilter: "blur(6px)",
          backgroundColor: "background.paper",
          borderRadius: 3,
          p: 2.5,
          boxShadow: "none",
          transition: (theme) =>
            theme.transitions.create("box-shadow, background-color", {
              easing: theme.transitions.easing.easeInOut,
              duration: 200,
            }),
          ...(elevate && {
            maxWidth: "100%",
            borderRadius: "unset",
            backgroundColor: (theme) =>
              alpha(theme.palette.background.paper, 0.9),
            boxShadow: 8,
          }),
        }}
      >
        <Stack direction="row" spacing={2}>
          <Stack
            alignItems="center"
            direction="row"
            spacing={1}
            sx={{ flexGrow: 1 }}
          >
            <Stack
              alignItems="center"
              //component={RouterLink}
              direction="row"
              display="inline-flex"
              // href={paths.index}
              spacing={1}
              sx={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  mt: "0.625rem !important",
                  width: "100%",
                }}
              >
                <Image src={orcaloLogo} alt="logo" />
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
