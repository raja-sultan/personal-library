import React from "react";
import Chart from "react-apexcharts";
import type { AvailableServerOptionTypes } from "./types";

export function AvailableServerSpaceChart(
  props: AvailableServerOptionTypes
): React.JSX.Element {
  const { seriesData = [70, 30] } = props;

  const options: any = {
    series: seriesData,
    chart: {
      type: "pie",
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        expandOnClick: false,
        dataLabels: {
          minAngleToShowLabel: 500,
        },
      },
    },
    colors: ["#8769FB", "#FCB835"],
    labels: ["Free", "Used"],
    responsive: [
      {
        breakpoint: 1800,
        options: {
          legend: {
            position: "right",
            fontSize: 14,
            offsetX: 5,
            itemMargin: {
              vertical: 4,
              horizontal: 0,
            },
          },
        },
      },
      {
        breakpoint: 1265,
        options: {
          chart: {
            width: 300,
          },
          pie: {
            offsetX: 0,
          },
          legend: {
            position: "right",
            offsetX: 0,
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 220,
          },
          legend: {
            position: "bottom",
            offsetX: 0,
            itemMargin: {
              horizontal: 4,
            },
          },
        },
      },
    ],
  };
  return (
    <div id="pie">
      <Chart
        options={options}
        series={options?.series}
        type="pie"
        width={240}
      />
    </div>
  );
}
