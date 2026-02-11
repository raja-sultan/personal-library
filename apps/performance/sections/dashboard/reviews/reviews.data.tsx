"use client";

import { Box, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useReviews } from "./use-reviwes";
import { ComponentLoader } from "@components/component-loader";

export function ReviewsData(): JSX.Element {
  const { barSeries, months, isLoading } = useReviews();
  const defaultMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const theme = useTheme();

  const barOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        borderRadius: 3,
        borderRadiusWhenStacked: "all",
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#9B8AFB", "#4E5BA6", "#7CD4FD"],
    stroke: {
      show: true,
      width: 5,
      colors: ["transparent"],
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
      onItemHover: {
        highlightDataSeries: undefined,
      },
      labels: {
        colors:
          theme.palette.mode === "dark"
            ? theme.palette.common.white
            : theme.palette.neutral[700],
      },
      fontSize: "12px",
      fontWeight: "400",
    },
    xaxis: {
      title: {
        text: "Time (Months)",
        style: {
          fontWeight: 600,
          fontSize: "1.4rem",
          color:
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : "#413757",
        },
      },
      categories: months.length === 0 ? defaultMonths : months,

      labels: {
        style: {
          colors:
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : theme.palette.neutral[400],
          fontSize: "1.2rem",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      title: {
        text: "No. of Reviews",
        style: {
          fontSize: "1.4rem",
          fontWeight: 600,
          color:
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : "#413757",
        },
      },
      labels: {
        style: {
          colors:
            theme.palette.mode === "dark"
              ? theme.palette.common.white
              : theme.palette.neutral[400],
          fontSize: "1.2rem",
          fontWeight: 400,
        },
      },
      min: 0,
      max: 100,
      tickAmount: 5,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter(val) {
          return `${val} Counts`;
        },
      },
    },
  };

  return (
    <Box mt={3}>
      {isLoading ? <ComponentLoader /> :
        <Chart options={barOptions} series={barSeries} type="bar" height={320} />
      }
    </Box>
  );
}
