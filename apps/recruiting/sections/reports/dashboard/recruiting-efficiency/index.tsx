import { TableHeader } from "common";
import { Box, Stack } from "@mui/system";
import "react-date-range/dist/styles.css";
import ReactApexChart from "react-apexcharts";
import "react-date-range/dist/theme/default.css";
import { RecruitingEfficiencyModal } from "./recruiting-efficiency-modal";
import { Button, Grid, Skeleton, Typography } from "@mui/material";
import useRecruitingEfficiency from "./use-recruiting-efficiency";

export function RecruitingEfficiency(): JSX.Element {
  const {
    isLoading,
    params,
    departmentOptions,
    officeOptions,
    userList,
    setParams,
    series,
    options,
    setRecruitingModals,
    getEfficiencyData,
    recruitingModals,
  } = useRecruitingEfficiency();

  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height={120} />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        {recruitingModals && (
          <RecruitingEfficiencyModal
            open={recruitingModals}
            params={params}
            setOpen={setRecruitingModals}
            dateWiseCount={getEfficiencyData?.data?.[0]}
            data={getEfficiencyData}
          />
        )}
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          my={1}
          alignItems="center"
        >
          <Typography variant="h6">Recruiting Efficiency</Typography>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                setRecruitingModals(true);
              }}
            >
              Save
            </Button>
          </Box>
        </Stack>

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
      </Grid>
      <Grid
        item
        container
        sx={{ flexWrap: { xs: "warp", sm: "nowrap" }, mt: 0, mb: 3 }}
        columnGap={2}
      >
        <Grid
          item
          xs={12}
          md={4}
          p={2}
          sx={{
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.25)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="subtitle1">Average time to fill</Typography>
          <Typography variant="h5" color="warning.light">
            {getEfficiencyData?.data[0]?.averageFillTime ?? "--"} Days
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          p={2}
          sx={{
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.25)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="subtitle1">Average time to Hire</Typography>
          <Typography variant="h5" color="primary.main">
            {getEfficiencyData?.data[0]?.averageStageTime ?? "--"} Days
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          p={2}
          sx={{
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.25)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="subtitle1">Average time in Stage</Typography>
          <Typography variant="h5" color="#36bffa">
            {getEfficiencyData?.data[0]?.averageHireTime ?? "--"} Days
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={2}>
        <Typography variant="h6">Applications Over Time</Typography>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </Grid>
    </Grid>
  );
}
