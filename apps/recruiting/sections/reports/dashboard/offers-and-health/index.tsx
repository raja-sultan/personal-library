import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { TableHeader } from "common";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { AddReportModal } from "./add-report-modal";
import { creatingAreaOptions, options } from "./offers-data";
import useOffers from "./use-offers";

function OffersAndHealth(): React.JSX.Element {
  const {
    open,
    setOpen,
    theme,
    data,
    isLoading,
    declineSeries,
    areaSeries,
    newSeries,
    departmentOptions,
    officeOptions,
    userList,
    setParams,
    params,
  } = useOffers();

  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height={120} />;
  }

  return (
    <>
      <Box
        sx={{
          my: 1,
        }}
      >
        <Box sx={styles.boxWrapper}>
          <Typography variant="h6">Offers & Hiring</Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Save
          </Button>
        </Box>
        <TableHeader
          showClearFilterButton
          gridProps={{
            lg: 2.2,
          }}
          onChanged={(e: any) => {
            setParams(e);
          }}
          tableHeaderData={[
            {
              type: "multiselect",
              FieldProps: {
                name: "department",
                label: "Department",
              },
              options: departmentOptions ?? [
                {
                  id: 1,
                  label: "No Department Found",
                  value: "No Department Found",
                },
              ],
            },
            {
              type: "multiselect",
              FieldProps: {
                name: "office",
                label: "Office",
              },
              options: officeOptions ?? [
                {
                  id: 1,
                  label: "No Office Found",
                  value: "No Office Found",
                },
              ],
            },
            {
              type: "multiselect",
              FieldProps: {
                name: "recruiters",
                label: "All Primary Recruiters",
              },
              options: userList ?? [
                {
                  id: 1,
                  label: "No User Found",
                  value: "No User Found",
                },
              ],
            },
            {
              type: "date",
              FieldProps: {
                name: "startDate",
                label: "Start Date",
              },
            },
            {
              type: "date",
              FieldProps: {
                name: "endDate",
                label: "End Date",
                minDateName: "startDate",
              },
            },
          ]}
        />
      </Box>
      <Grid container>
        <Grid
          container
          columnGap={2.5}
          rowGap={2.5}
          sx={{
            flexWrap: { md: "nowrap", xs: "wrap" },
            spacing: 2,
            mt: 0,
            mb: 3,
          }}
        >
          <Grid item xs={12} md={4} p={1.5} sx={styles.chartsBg(theme)}>
            <Box sx={styles.boxWrapper}>
              <Typography variant="subtitle1">
                Offer Acceptance Rate:
              </Typography>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Typography variant="h6" sx={{ color: "#2E90FA" }}>
                  {data?.data?.offerAcceptanceRate[0]?.averagePercentage ??
                    "--"}{" "}
                  %
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item md={4} p={1.5} xs={12} sx={styles.chartsBg(theme)}>
            <Box sx={styles.boxWrapper}>
              <Typography variant="subtitle1">Average Time to Fill:</Typography>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.warning.main }}
                >
                  {Math.floor(
                    data?.data?.averageFillTime[0]?.totalAverageFillTime
                  ) ?? "--"}{" "}
                  Days
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item md={4} p={1.5} xs={12} sx={styles.chartsBg(theme)}>
            <Box sx={styles.boxWrapper}>
              <Typography variant="subtitle1">Average time to Hire:</Typography>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Typography variant="h6" sx={{ color: "primary.main" }}>
                  {Math.floor(data?.data?.averageHireTime[0]?.totalHireTime) ??
                    "--"}{" "}
                  Days
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid container columnGap={2}>
        <Grid
          container
          columnGap={2}
          rowGap={2}
          sx={{ flexWrap: { md: "nowrap", xs: "wrap" } }}
        >
          <Grid container xs={12} md={8}>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: theme.palette.background.default,
                p: 1.5,
                borderRadius: "8px",
              }}
            >
              <Typography variant="subtitle1">Offers Created</Typography>
              <ReactApexChart
                options={creatingAreaOptions("#008FFB")}
                series={newSeries}
                type="area"
                height={160}
              />
            </Grid>
            <Grid item xs={12} sx={styles.cardWrapper}>
              <Typography variant="subtitle1">Offers Accepted</Typography>
              <ReactApexChart
                options={creatingAreaOptions(theme.palette.success.darkest)}
                series={areaSeries}
                type="area"
                height={160}
              />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ ...styles.cardWrapper(theme), marginTop: 0 }}
          >
            {/* <Typography >Top offers decline reasons</Typography> */}
            <Box>
              <Typography variant="subtitle1">
                Top offers decline reasons
              </Typography>
              <ReactApexChart
                options={options}
                series={declineSeries}
                type="pie"
                height={400}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* Add Report Modal */}
      {open && (
        <AddReportModal
          open={open}
          setOpen={setOpen}
          dateWiseCount={data?.data?.[0]}
          params={params}
          data={data}
        />
      )}
    </>
  );
}

export default OffersAndHealth;

const styles = {
  boxWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chartsBg: (theme: any) => ({
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.25)",
    borderRadius: "8px",
    backgroundColor: theme.palette.background.default,
  }),
  cardWrapper: (theme: any) => ({
    marginTop: 2.5,
    backgroundColor: theme.palette.background.default,
    p: 1.5,
    borderRadius: "8px",
  }),
};
