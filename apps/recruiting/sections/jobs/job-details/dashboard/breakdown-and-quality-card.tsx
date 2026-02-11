import React from "react";
import { Grid, Typography, useTheme } from "@mui/material";
import { FormProvider, RHFCustomSelect } from "common";
import { useForm } from "react-hook-form";
import Chart from "react-apexcharts";

function CandidateSourceBreakdownChart({ theme }: any): JSX.Element {
  const chartData: any = {
    series: [44, 55, 41, 17, 15, 15, 15, 15, 15, 15],
    options: {
      chart: {
        type: "donut",
      },
      colors: [
        "#441919",
        "#ffc53a",
        "#dc3f59",
        "#9e77ed",
        "#00b2a9",
        "#ff6d66",
        "#96bd89",
        "#1d89c1",
        "#00b907",
        "#ff12e7",
      ],
      labels: [
        "Team A",
        "Team B",
        "Team C",
        "Team D",
        "Team E",
        "Team F",
        "Team G",
        "Team H",
        "Team I",
        "Team J",
      ],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
          customScale: 0.8,
          offsetX: 265,
          donut: {
            size: "24%",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "top",
        fontSize: 14,
        horizontalAlign: "left",
        fontWeight: 600,
        width: 300,
        height: "100%",
        floating: true,

        markers: {
          width: 18,
          height: 18,
          offsetX: -3,
          offsetY: 3,
        },
        labels: {
          colors: theme?.palette?.text.primary,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 15,
        },
        formatter(val, opts) {
          return ` ${opts.w.globals.series[opts.seriesIndex]} ${" "} ${val}`;
        },
      },
      responsive: [
        {
          breakpoint: 1780,
          options: {
            chart: {
              width: 800,
            },
            plotOptions: {
              pie: {
                offsetX: 240,
              },
            },
            legend: {
              fontWeight: 600,

              itemMargin: {
                horizontal: 20,
                vertical: 15,
              },
            },
          },
        },
        {
          breakpoint: 1590,
          options: {
            chart: {
              width: 750,
            },
            plotOptions: {
              pie: {
                offsetX: 220,
              },
            },
            legend: {
              fontWeight: 600,

              itemMargin: {
                horizontal: 20,
                vertical: 15,
              },
            },
          },
        },
        {
          breakpoint: 1480,
          options: {
            chart: {
              width: 700,
            },
            plotOptions: {
              pie: {
                offsetX: 200,
              },
            },
            legend: {
              fontWeight: 600,
              horizontalAlign: "center",
              itemMargin: {
                horizontal: 10,
                vertical: 15,
              },
            },
          },
        },
        {
          breakpoint: 1380,
          options: {
            chart: {
              width: 650,
            },
            plotOptions: {
              pie: {
                offsetX: 180,
              },
            },
            legend: {
              fontWeight: 600,

              itemMargin: {
                horizontal: 20,
                vertical: 15,
              },
            },
          },
        },

        {
          breakpoint: 1280,
          options: {
            chart: {
              width: 550,
              height: 270,
            },
            plotOptions: {
              pie: {
                offsetX: 160,
              },
            },
            legend: {
              fontWeight: 600,

              itemMargin: {
                horizontal: 13,
                vertical: 8,
              },
            },
          },
        },
        {
          breakpoint: 1110,
          options: {
            chart: {
              width: 500,
              height: 240,
            },
            plotOptions: {
              pie: {
                offsetX: 140,
              },
            },
            legend: {
              fontWeight: 600,

              itemMargin: {
                horizontal: 11,
                vertical: 8,
              },
            },
          },
        },
        {
          breakpoint: 1005,
          options: {
            chart: {
              width: 490,
              height: 220,
            },
            plotOptions: {
              pie: {
                offsetX: 110,
              },
            },
            legend: {
              fontWeight: 600,

              itemMargin: {
                horizontal: 9,
                vertical: 6,
              },
            },
          },
        },
        {
          breakpoint: 900,
          options: {
            chart: {
              width: 650,
              height: 250,
            },
            plotOptions: {
              pie: {
                offsetX: 170,
              },
            },
            legend: {
              fontWeight: 600,

              itemMargin: {
                horizontal: 20,
                vertical: 11,
              },
            },
          },
        },
        {
          breakpoint: 695,
          options: {
            chart: {
              width: 500,
              height: 200,
            },
            plotOptions: {
              pie: {
                offsetX: 120,
              },
            },
            legend: {
              fontWeight: 600,

              itemMargin: {
                horizontal: 10,
                vertical: 7,
              },
            },
          },
        },
        {
          breakpoint: 570,
          options: {
            chart: {
              width: 400,
              height: 270,
            },
            plotOptions: {
              pie: {
                offsetX: 0,
              },
            },
            legend: {
              fontWeight: 600,
              position: "bottom",
              width: "100%",
              floating: false,
              fontSize: 12,
              markers: {
                height: 10,
                width: 10,
                offsetX: -1,
                offsetY: 0,
              },
              itemMargin: {
                horizontal: 7,
                vertical: 4,
              },
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              fontWeight: 500,
              fontSize: 12,
              itemMargin: {
                horizontal: 3,
                vertical: 2,
              },
            },
          },
        },
      ],
    },
  };

  return (
    <div id="chart">
      <Chart
        options={chartData?.options}
        series={chartData?.series}
        type="donut"
        width={900}
        height={310}
      />
    </div>
  );
}
export function CandidateSourceBreakdownCard(): JSX.Element {
  const theme = useTheme();

  const defaultValues = {
    activeCandidatesBeforeFace: "",
    allActiveCandidates: "",
    allCandidates: "",
  };
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const onSubmit = (formData): any => {
    console.log(formData);
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" px={2}>
        <Typography fontWeight={600} variant="body1">
          Candidates Source Breakdown & Quality
        </Typography>
        <Grid item xs={12} md={6} py={2}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFCustomSelect
              name="applicationTrends"
              options={[
                {
                  id: 1,
                  value: "activeCandidatesBeforeFace ",
                  label: "Active Candidates Before Face To Face",
                },
                {
                  id: 2,
                  value: "allActiveCandidates",
                  label: "All Active Candidates",
                },
                { id: 3, value: "allCandidates", label: "All Candidates" },
              ]}
            />
          </FormProvider>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ overflow: "hidden" }} mx={1} >
        <CandidateSourceBreakdownChart theme={theme} />
      </Grid>
    </>
  );
}
