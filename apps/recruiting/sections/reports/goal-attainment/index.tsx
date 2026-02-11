"use client";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { fieldData, defaultValues, series, options } from "./data";
import { FormProvider, CustomBreadCrumbs } from "common";
import { useForm } from "react-hook-form";
import ReactApexChart from "react-apexcharts";
import ShareModal from "./share-modal";

export default function GoalAttainmentSection(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const breadcrumbs = [
    { key: "1", value: "Home", link: "/dashboard" },
    { key: "2", value: "Reports", link: "/reports" },
    { key: "3", value: "Essential Reports", link: "" },
  ];
  const theme = useTheme();
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  const onSubmit = (formData): void => {
    console.log(formData);
  };

  return (
    <Box p={2} bgcolor={theme.palette.background.paper}>
      <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      <Box py={2}>
        <Grid container justifyContent="space-between" pt={1} mb={3}>
          <Grid item md={6} xs={12}>
            <Typography variant="body2" fontWeight={600}>
              Times in Stage Goal Attainment
            </Typography>
          </Grid>
          <Grid item md={6} xs={12} container justifyContent="end">
            <Button
              size="small"
              onClick={() => {
                setIsOpen(true);
              }}
              variant="outlined"
            >
              Share
            </Button>
            <IconButton
              size="small"
              sx={{ backgroundColor: theme.palette.primary.main, px: 1, mx: 1 }}
            >
              <ArrowDownwardIcon
                fontSize="small"
                sx={{ color: theme.palette.neutral[200] }}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Box
          p={2}
          boxShadow=" 0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
          borderRadius={1}
          mb={2}
        >
          <Typography variant="body1" fontWeight={600}>
            Apply Filters
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container gap={1.5} my={3}>
              {fieldData?.map((item) => (
                <Grid item md={item?.md} xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} />
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="end">
              <Button variant="contained" size="small">
                Apply
              </Button>
            </Box>
          </FormProvider>
        </Box>
        <Box borderRadius={1} p={2} bgcolor="#f9fbfc" my={3}>
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
          />
        </Box>
      </Box>
      {isOpen && <ShareModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </Box>
  );
}
