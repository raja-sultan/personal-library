import React from "react";
import type { ProductSalesTypes } from "./types";
import Chart from "react-apexcharts";

export function ProductSalesChart(
  props: ProductSalesTypes | any
): React.JSX.Element {
  const { chartData } = props;

  const seriesData = [70, 45, 65, 50, 50];
  const categoriesData = [
    "Performance",
    "Recruiting",
    "Onboarding",
    "Buzz Hr",
    "Clocklog",
  ];

  const data: any = {
    series: [
      {
        name: "Product Sale",
        // data: seriesData,
        data: chartData?.seriesData ?? seriesData,
      },
    ],
    options: {
      chart: {
        type: "bar",
        stacked: true,
      },
      plotOptions: {
        bar: {
          borderRadius: "4",
          columnWidth: "35%",
          distributed: true,
          dataLabels: {
            enabled: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#7A5AF8", "#F28FA1", "#CBDF46", "#CDA7FF", "#F4C974"],

      xaxis: {
        // categories: categoriesData,
        categories: chartData?.categoriesData ?? categoriesData,
        splitLine: {
          show: false,
        },
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "#565666",
          },
        },
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: true,
        },
        splitLine: {
          enabled: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          style: {
            fontSize: 16,
            colors: "#565666",
          },
          formatter(val: any) {
            return `${val }%`;
          },
        },
      },
      legend: {
        show: false,
      },

      responsive: [
        {
          breakpoint: 1820,
          options: {
            chart: {
              width: "190%",
            },
          },
        },
        {
          breakpoint: 1600,
          options: {
            chart: {
              width: "180%",
            },
          },
        },
        {
          breakpoint: 1535,
          options: {
            chart: {
              width: "170%",
            },
          },
        },
        {
          breakpoint: 1390,
          options: {
            chart: {
              width: "180%",
            },
          },
        },
        {
          breakpoint: 1265,
          options: {
            chart: {
              width: "170%",
            },
          },
        },
        {
          breakpoint: 1200,
          options: {
            chart: {
              width: "330%",
            },
          },
        },
        {
          breakpoint: 1135,
          options: {
            chart: {
              width: "300%",
            },
          },
        },
        {
          breakpoint: 1020,
          options: {
            chart: {
              width: "270%",
            },
          },
        },
        {
          breakpoint: 960,
          options: {
            chart: {
              width: "250%",
            },
          },
        },
        {
          breakpoint: 890,
          options: {
            chart: {
              width: "220%",
            },
          },
        },
        {
          breakpoint: 790,
          options: {
            chart: {
              width: "190%",
            },
          },
        },
        {
          breakpoint: 720,
          options: {
            chart: {
              width: "170%",
            },
          },
        },
        {
          breakpoint: 650,
          options: {
            chart: {
              width: "150%",
            },
          },
        },
        {
          breakpoint: 600,
          options: {
            chart: {
              width: "130%",
            },
          },
        },
        {
          breakpoint: 522,
          options: {
            yaxis: {
              labels: {
                style: {
                  fontSize: 12,
                  colors: "#565666",
                },
              },
            },
            chart: {
              width: "115%",
            },
          },
        },
      ],
    },
  };
  return (
    <div id="chart">
      <Chart
        options={data.options}
        series={data.series}
        type="bar"
        height={320}
        width="220%"
      />
    </div>
  );
}
