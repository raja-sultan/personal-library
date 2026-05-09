import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { HomeCard } from "@components/custom-home-card/custom-home-card";

export const reviewStyles = {
  main: {
    padding: "10.3px 18px",
    position: "relative",
    "@media (max-width:380px)": {
      padding: "0px 12px",
    },
    "& .apexcharts-tooltip": (theme) => ({
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.palette.neutral[400]
          : theme.palette.neutral[900],
      color:
        theme.palette.mode === "dark"
          ? theme.palette.neutral[500]
          : theme.palette.neutral[900],
    }),
  },

  title: {
    position: { xs: "none", md: "absolute" },
    top: "18px",
    fontSize: "2.4rem",
    fontWeight: 600,
  },
  content: {
    textAlign: "center",
  },
};

export const barSeries = [
  {
    name: "Upward Reviews",
    data: [60, 38, 82, 62, 40, 40, 62, 50, 40, 35, 45, 40],
  },
  {
    name: "Downward Reviews",
    data: [40, 56, 24, 50, 32, 56, 40, 52, 50, 30, 55, 40],
  },
  {
    name: "Self Reviews",
    data: [72, 62, 90, 82, 55, 70, 82, 90, 70, 50, 90, 63],
  },
];

export function OnBoardingStatsSection(): JSX.Element {
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
      categories: [
        "jan",
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
      ],
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
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  return (
    <HomeCard>
      <Box sx={reviewStyles.main}>
        <Typography color="text.primary" sx={reviewStyles.title}>
          On-Boarding Status
        </Typography>
        <Chart
          options={barOptions}
          series={barSeries}
          type="bar"
          height={350}
        />
      </Box>
    </HomeCard>
  );
}
