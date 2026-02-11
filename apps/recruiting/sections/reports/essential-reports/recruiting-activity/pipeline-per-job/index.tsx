import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { CustomBreadCrumbs, CustomTable, TableHeader } from "common";
//import SouthIcon from "@mui/icons-material/South";
//import { ShareModal } from "./share-modal";
import { breadcrumbs, creatingAreaOptions } from "./pipeline-data";
import ReactApexChart from "react-apexcharts";
import usePipeline from "./use-pipeline";

function PipelinePerJobSection(): JSX.Element {
  const {
    data,
    isError,
    isFetching,
    isLoading,
    isSuccess,
    stageLabels,
    newSeries,
    //open,
    // setOpen,
    theme,
    setParams,
    departmentOptions,
    officeOptions,
    jobList,
    userList,
  } = usePipeline();

  const columns = [
    {
      accessorFn: (row: any) => row.count ?? "-",
      id: "count",
      header: () => <Box>Count</Box>,
      cell: (info: any) => {
        return <Box>{info?.row?.original?.count ?? "-"}</Box>;
      },
      isSortable: false,
    },
    {
      accessorFn: (row: any) => row.stage ?? "-",
      id: "stage",
      header: () => <Box>Stage</Box>,
      cell: (info: any) => {
        return <Box>{info?.row?.original?.stage ?? "-"}</Box>;
      },
      isSortable: false,
    },
  ];

  return (
    <Card
      sx={{
        p: "8px 25px 25px 25px",
        background: "background.default",
      }}
    >
      <Box sx={{ mt: 1.5 }}>
        <CustomBreadCrumbs breadcrumbs={breadcrumbs} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" sx={{ color: "text.primary", my: 3 }}>
          Current Pipeline Per Job
        </Typography>
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(true);
            }}
          >
            Share
          </Button>
          <Avatar sx={{ backgroundColor: "primary.main" }}>
            <SouthIcon sx={{ color: "common.white" }} />
          </Avatar>
        </Box> */}
      </Box>
      <Card sx={{ p: 2 }}>
        <Typography
          variant="body1"
          sx={{ color: "text.primary", fontWeight: 600 }}
        >
          Apply Filters
        </Typography>
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
                name: "job",
                label: "Job",
              },
              options: jobList ?? [
                {
                  id: 1,
                  label: "No Job Found",
                  value: "No Job Found",
                },
              ],
            },
            {
              type: "select",
              FieldProps: {
                name: "jobStatus",
                label: "Job Status",
              },
              options: [
                {
                  label: "Open",
                  value: "Open",
                },
                {
                  label: "Close",
                  value: "Close",
                },
                {
                  label: "Draft",
                  value: "Draft",
                },
              ],
            },
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
                name: "user",
                label: "User Filter",
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
                name: "date",
                label: "Date Applied",
              },
            },
          ]}
        />
      </Card>
      <Box sx={{ mt: 2 }}>
        {/* Chart to display data */}
        <Box
          sx={{
            my: 3,
            backgroundColor: "background.default",
            borderRadius: "8px",
            py: 2,
          }}
        >
          <ReactApexChart
            options={
              creatingAreaOptions(
                theme.palette.success.darkest,
                stageLabels
              ) as ApexCharts.ApexOptions
            }
            series={newSeries}
            type="area"
            height={220}
          />
        </Box>
        <CustomTable
          data={data?.data}
          columns={columns}
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          isPagination
          isSuccess={isSuccess}
          showSerialNo
          totalPages={data?.data?.meta?.pages ?? 0}
          currentPage={data?.data?.meta?.page ?? 1}
          // onPageChange={(onPageData: any) => {
          //   setParams({
          //     page: onPageData,
          //     offset: (onPageData - 1) * 10,
          //   });
          // }}
        />
      </Box>
      {/* Share Email Modal */}
      {/* <ShareModal open={open} setOpen={setOpen} /> */}
    </Card>
  );
}

export default PipelinePerJobSection;
