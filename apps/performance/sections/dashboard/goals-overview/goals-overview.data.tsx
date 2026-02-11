import { Box, Typography, useTheme } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import { useGetDashboardAnalyticsQuery } from "@services/dashboard/dashboard-api";
import { ComponentLoader } from "@components/component-loader";

export function GoalsOverviewData(): JSX.Element {
  const theme = useTheme();
  const { data, isLoading, isError } = useGetDashboardAnalyticsQuery({});

  const barSeries = data?.data?.goals?.data?.map(
    (obj: { count: number | string }) => obj?.count ?? 0
  );

  const barOptions: ApexOptions = {
    chart: {
      height: 350,
      width: "100%",
      type: "radialBar",
    },
    legend: {
      show: true,
      position: "bottom",
      markers: {
        radius: 12,
      },
      formatter(seriesName, opts) {
        return `${seriesName}: ${opts.w.globals.series[opts.seriesIndex]}`;
      },
      itemMargin: {
        vertical: 10,
        horizontal: 50,
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
    colors: ["#FEA3B4", "#6172F3", "#4E5BA6", "#EE46BC"],
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
            fontSize: "14px",
            fontWeight: 400,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.neutral[700],
          },
          total: {
            show: true,
            label: "Total",
            fontSize: "12px",
            fontWeight: 600,
            color:
              theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.neutral[700],
            formatter() {
              return `${data?.data?.goals?.totalGoals}%`;
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  show: false,
                },
              },
            },
          },
        },
      },
    ],
    labels: data?.data?.goals?.data?.map(
      (obj: { type: string }) => obj?.type ?? "-"
    ),
  };

  const chartStyle = {
    width: { lg: "480px", md: "480px", xs: "100%" },
    padding: "0px 10px",
    foreignObject: {
      height: "300px",
    },
  };

  return (
    <Box sx={chartStyle}>
      {isLoading ? (
        <ComponentLoader />
      ) : (
        <ReactApexChart
          options={barOptions}
          series={barSeries}
          type="radialBar"
          height={350}
        />
      )}
      {isError && (
        <Typography variant="body1" color="neutral.500">
          No Data Found
        </Typography>
      )}
    </Box>
  );
}
