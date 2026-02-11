import { Grid, Typography, useTheme } from "@mui/material";
import { FormProvider, RHFCustomSelect } from "common";
import { useForm } from "react-hook-form";
import React from "react";
import Chart from "react-apexcharts";

// function generateDayWiseTimeSeries(s): JSX.Element {
//   const values: any = [
//     [
//       10, 1, 0, 1, 4, 5, 7, 9, 3, 7, 8, 4, 1, 4, 9, 7, 9, 15, 21, 16, 24, 23, 3,
//       1, 4, 11, 11, 5, 7, 9, 3, 7, 8, 11, 13, 15, 20, 11, 9, 15, 21, 16, 24, 23,
//       8, 11, 13, 15, 20, 11, 7, 9, 3, 7, 15, 21, 16, 15, 20, 11, 9, 15, 21, 11,
//       8, 7, 11, 5, 10, 7, 9, 3, 7, 8, 7, 9, 3, 7, 9, 15, 18, 16, 24, 1, 1, 4,
//       11, 11, 5, 7, 9, 3, 7, 8, 11, 13, 15,
//     ],
//     [
//       0, 0, 0, 1, 5, 6, 2, 3, 8, 1, 4, 11, 11, 5, 7, 9, 3, 7, 8, 11, 13, 15, 7,
//       22, 16, 23, 7, 11, 5, 9, 12, 7, 9, 11, 2, 3, 8, 1, 4, 9, 15, 21, 16, 20,
//       11, 9, 15, 21, 5, 7, 9, 3, 7, 8, 9, 12, 7, 9, 11, 2, 3, 11, 2, 3, 8, 1, 4,
//       11, 11, 5, 7, 9, 3, 7, 8, 11, 13, 15, 7, 22, 16, 23, 7, 11, 5, 9, 12, 7,
//       9, 11, 2, 3, 8, 1, 4, 9, 15, 21, 16,
//     ],
//     [
//       0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 8, 7, 22, 16, 23, 7, 11, 5, 9, 12, 2, 4, 8,
//       1, 7, 11, 7, 9, 11, 2, 3, 16, 23, 7, 11, 5, 10, 4, 6, 2, 8, 1, 4, 9, 15,
//       21, 16, 5, 4, 3, 2, 10, 5, 6, 12, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//       0, 0, 0, 0,
//     ],
//   ];
//   let i = 0;
//   const series: any = [];
//   let x = new Date("10 Nov 2012").getTime();
//   while (i < values[s].length) {
//     series.push({ x, y: values[s][i] });
//     x += 8640000;
//     i++;
//   }
//   return series;
// }
const start = new Date("10 Nov 2012").getTime();
const end = new Date("18 Nov 2012").getTime();
function ApplicationTrendsChart({
  theme,
  activeTrends,
  newTrends,
  rejectedTrends,
}: any): JSX.Element {
  const chartData: any = {
    series: [
      {
        name: "New",
        // data: generateDayWiseTimeSeries(0),
        data: newTrends,
      },
      {
        name: "Active",
        // data: generateDayWiseTimeSeries(1),
        data: activeTrends,
      },
      {
        name: "Reject",
        // data: generateDayWiseTimeSeries(2),
        data: rejectedTrends,
      },
    ],
    options: {
      colors: ["#7A5AF8", "#12B76A", "#D92D20"],
      chart: {
        type: "area",
        stacked: false,
        zoom: {
          enabled: false,
          // autoScaleYaxis: true
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetY: 23,
        fontSize: 14,
        fontWeight: 600,

        markers: {
          offsetY: 1,
          offsetX: -2,
        },
        formatter(val, opts) {
          return `${opts.w.globals.series[opts.seriesIndex].length}  ${val}`;
        },
        labels: {
          colors: undefined,
          useSeriesColors: true,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 0,
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        width: 1.2,
      },
      xaxis: {
        type: "datetime",
        min: start,
        max: end,
        labels: {
          offsetX: 20,
          style: {
            colors: theme?.palette?.text?.secondary,
          },

          formatter(value) {
            const date = new Date(value);
            const options: any = { weekday: "short", day: "numeric" };
            return date.toLocaleDateString(undefined, options); // Format date as 'Short Weekday, Short Month Day, Year'
          },
        },
        tickAmount: 9,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        // min: 0, // Minimum value for y-axis
        // max: 30,
        fontSize: 10,
        labels: {
          show: true,
          offsetX: -12,
          offsetY: 2,
          style: {
            colors: theme?.palette?.text?.secondary,
            fontSize: "15px",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      grid: {
        padding: {
          left: -5,
          right: 5,
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0,
          opacityTo: 0.3,
          stops: [0, 100],
        },
      },
      responsive: [
        {
          breakpoint: 450,
          options: {
            chart: {
              height: 300,
              width: 600,
            },
            legend: {
              position: "top",
              offsetY: 5,
              horizontalAlign: "left",
            },
          },
        },
      ],
    },
  };

  return (
    <div id="chart" style={{ width: "100%" }}>
      <Chart
        options={chartData?.options}
        series={chartData?.series}
        type="area"
        width="100%"
        height={350}
      />
    </div>
  );
}

export function ApplicationTrendsCard({
  activeTrends,
  newTrends,
  rejectedTrends,
}): JSX.Element {
  // const defaultValues = {
  //   all: "",
  //   new: "",
  //   active: "",
  //   rejected: "",
  // };
  const theme = useTheme();
  // const methods = useForm({ defaultValues });
  // const { handleSubmit } = methods;

  // console.log(activeTrends, newTrends, rejectedTrends);

  // const onSubmit = (formData): any => {
  //   console.log(formData);
  // };
  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography fontWeight={600} variant="body1">
          Application Trends
        </Typography>
        <Grid item xs={12} sm={6} md={1.5}>
          {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFCustomSelect
              name="applicationTrends"
              options={[
                { id: 1, value: "all", label: "All" },
                { id: 2, value: "new", label: "New" },                                                                                                             
                { id: 3, value: "active", label: "Active" },
                { id: 4, value: "rejected", label: "Rejected" },
              ]}
            />
          </FormProvider> */}
        </Grid>
      </Grid>
      <Grid container sx={{ overflow: { md: "hidden", xs: "scroll" } }}>
        <ApplicationTrendsChart
          activeTrends={activeTrends}
          newTrends={newTrends}
          rejectedTrends={rejectedTrends}
          theme={theme}
        />
      </Grid>
    </>
  );
}
