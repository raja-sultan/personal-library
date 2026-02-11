"use client";
import {
  Grid,
  Paper,
  Box,
  Button,
  useTheme,
  Typography,
  Avatar,
} from "@mui/material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { useRouter } from "next/navigation";

import React from "react";
import { nanoid } from "@reduxjs/toolkit";
import { newHireInfoAllMockData } from "./data";

export default function NewHireInfoPageSection(): JSX.Element {
  const router = useRouter();
  const theme = useTheme();

  return (
    <Paper>
      <Box borderBottom={`1px solid ${theme.palette.grey[300]}`}>
        <Button
          variant="text"
          onClick={() => {
            router.push("/new-hiring");
          }}
          startIcon={<ArrowCircleLeftOutlinedIcon />}
        >
          New Hire Summary
        </Button>
      </Box>
      <Grid container justifyContent="center" alignItems="center" gap={2}>
        {newHireInfoAllMockData?.map((ele) => (
          <Grid
            key={nanoid()}
            container
            gap={1}
            borderBottom={`1px solid ${theme.palette.grey[200]}`}
          >
            <Grid item xs={12} md={4} px={2} py={1}>
              <Typography variant="h6" mb={2}>
                {ele?.title}
              </Typography>
              <Typography variant="subtitle2" color={theme.palette.grey[500]}>
                {ele?.description}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              lg={4.3}
              my={1}
              px={2}
              container
              justifyContent="space-between"
              borderRadius={1}
              border={`1px solid ${theme.palette.grey[200]}`}
            >
              {ele?.data?.map((dataItem) => (
                <React.Fragment key={nanoid()}>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    py={2}
                    borderBottom={`1px solid ${theme.palette.grey[200]}`}
                  >
                    <Typography variant="subtitle2" fontWeight={600}>
                      {dataItem?.name}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    py={2}
                    container
                    justifyContent={{ sm: "end", xs: "start" }}
                    borderBottom={`1px solid ${theme.palette.grey[200]}`}
                  >
                    <Typography
                      color={theme.palette.grey[500]}
                      variant="subtitle2"
                    >
                      {dataItem?.value}
                    </Typography>
                  </Grid>
                </React.Fragment>
              ))}
              {ele?.notifyPeople && (
                <Grid container py={2} mb={5}>
                  {ele?.notifyPeople?.map((avt) => (
                    <Avatar
                      key={nanoid()}
                      alt={avt?.name}
                      src={avt?.profileImg}
                      sx={{ width: 27, height: 27 }}
                    />
                  ))}
                </Grid>
              )}
            </Grid>
            {ele?.id === 1 && (
              <Grid
                container
                item
                mb={2}
                md={8.4}
                xs={12}
                justifyContent={{ md: "end", xs: "center" }}
              >
                <Button
                  onClick={() => {
                    router.push(
                      "/new-hiring/new-hire-info/preview-welcome-experience"
                    );
                  }}
                  variant="outlined"
                  size="small"
                >
                  Preview Welcome Experience
                </Button>
              </Grid>
            )}
          </Grid>
        ))}
        <Grid
          container
          gap={1.5}
          my={2}
          px={2}
          justifyContent={{ md: "end", xs: "center" }}
        >
          <Button variant="outlined" size="small">
            Back
          </Button>
          <Button variant="contained" size="small">
            Onboarding Another Employee
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
