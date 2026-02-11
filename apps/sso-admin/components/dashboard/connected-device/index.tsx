import React from "react";
import Chart from "react-apexcharts";
import type { ConnectedDeviceTypes } from "./types";

export function ConnectedDeviceChart(
  props: ConnectedDeviceTypes
): React.JSX.Element {
  const { seriesData = [67, 84, 97] } = props;

  const options: any = {
    chart: {
      id: "radialBar",
    },
    series: seriesData,
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 10,
          size: "50%",
        },
        dataLabels: {
          total: {
            formatter(value: any) {
              const sum = value.globals.series.reduce(
                (a: any, b: any) => a + b,
                0
              );
              const percent = sum / value.globals.series.length;
              return percent.toFixed(1);
            },
            show: true,
            label: "",
          },
          name: {
            offsetY: -10,
            show: true,
            fontWeight: 400,
          },
          value: {
            fontSize: 18,
            fontWeight: 600,
            show: true,
            offSetX: 0,
            offsetY: -5,
          },
        },
      },
    },
    colors: ["#F54A4A", "#FAC300", "#23AB8A"],
    stroke: {
      lineCap: "round",
    },
    labels: ["Laptop", "Mobile", "Tablet"],

    legend: {
      show: true,
      fontSize: 14,
      position: "right",
      offsetY: 10,
      offsetX: 5,
      labels: {
        useSeriesColors: false,
      },
      itemMargin: {
        vertical: 4,
        horizontal: 0,
      },
    },
    responsive: [
      {
        breakpoint: 1800,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: "right",
            offsetX: 10,
            offsetY: 0,
          },
          value: {
            fontSize: 14,
          },
        },
      },
      {
        breakpoint: 1265,
        options: {
          chart: {
            width: 340,
          },
          pie: {
            offsetX: 10,
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
            width: 255,
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
    <div id="radialBar">
      <Chart
        options={options}
        series={options?.series}
        type="radialBar"
        width={260}

      />
    </div>
  );
}
