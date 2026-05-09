import React from "react";
import { Typography } from "@mui/material";
import { HomeCard } from "@components/custom-home-card/custom-home-card";
import ReactApexChart from "react-apexcharts";

export function MyTaskSection(): JSX.Element {
  const series: any = [44, 55, 13, 43];
  const options: any = {
    chart: {
      type: "donut",
    },
    colors: ["#9B8AFB"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <HomeCard>
      <Typography variant="h5" color="text.primary" sx={{ pb: 2 }}>
        My Tasks
      </Typography>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={160}
      />
    </HomeCard>
  );
}
