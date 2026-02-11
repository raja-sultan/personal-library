import { Button, Grid, Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TableHeader } from "common";
import ReactApexChart from "react-apexcharts";
import { PipelineHistoryModal } from "./pipeline-modal";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import usePipelineHealth from "./use-pipeline-health";

export function PipelineHealth(): JSX.Element {
  const {
    data,
    isLoading,
    series,
    closePipelineModal,
    options,
    pipelineModals,
    setPipelineModals,
    setParams,
    departmentOptions,
    officeOptions,
    userList,
    params,
  } = usePipelineHealth();

  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height={120} />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <PipelineHistoryModal
          isOpen={pipelineModals}
          closeModel={closePipelineModal}
          params={params}
          dateWiseCount={data?.data[0]}
          setPipelineModals={setPipelineModals}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            py: 0.5,
            alignItems: { xs: "start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Typography variant="h6">Pipeline Health</Typography>
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <Button
              variant="contained"
              onClick={() => {
                setPipelineModals(true);
              }}
            >
              Save
            </Button>
          </Box>
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
      </Grid>
      <Grid
        item
        container
        xs={12}
        flexWrap="nowrap"
        columnGap={2}
        sx={{ mt: 0, mb: 3 }}
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
            justifyContent: "space-between",
            backgroundColor: "background.default",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1">No. of open openings</Typography>
          <Typography variant="h5" color="warning.light">
            {data?.data[0]?.openingCount ? data?.data[0]?.openingCount : "--"}{" "}
            Days
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
            justifyContent: "space-between",
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="subtitle1">No. of open jobs</Typography>
          <Typography variant="h5" color="warning.light">
            {data?.data[0]?.openCount ? data?.data[0]?.openCount : "--"} Days
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={2.5}>
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
